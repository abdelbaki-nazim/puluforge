"use client";
import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Typography } from "@progress/kendo-react-common";
import axios from "axios";

interface FormValues {
  userId: string;
  createS3: boolean;
  createRDS: boolean;
  createEKS: boolean;
  s3BucketName: string;
  databases: { dbName: string; username: string; password: string }[];
}

const DeploymentForm = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    userId: "",
    createS3: false,
    createRDS: false,
    createEKS: false,
    s3BucketName: "",
    databases: [{ dbName: "", username: "", password: "" }],
  };

  const handleSubmit = async (
    values: { [name: string]: any },
    event?: React.SyntheticEvent<any>
  ) => {
    setLoading(true);

    try {
      const formValues = values as FormValues;
      const response = await axios.post("/api/deploy", formValues);
      setResult(response.data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <Typography.h2>Deploy Infrastructure</Typography.h2>

      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <Field
              id="userId"
              name="userId"
              label="User ID"
              component={Input}
              validator={(value) => (!value ? "User ID is required" : "")}
              required={true}
            />

            <Field
              id="createS3"
              name="createS3"
              label="Create S3 Bucket"
              component={Checkbox}
            />

            <Field
              id="createRDS"
              name="createRDS"
              label="Create RDS Instance"
              component={Checkbox}
            />

            <Field
              id="createEKS"
              name="createEKS"
              label="Create EKS Cluster"
              component={Checkbox}
            />

            {formRenderProps.valueGetter("createS3") && (
              <Field
                id="s3BucketName"
                name="s3BucketName"
                label="S3 Bucket Name"
                component={Input}
                validator={(value) => (!value ? "Bucket name is required" : "")}
              />
            )}

            {formRenderProps.valueGetter("createRDS") && (
              <>
                <Typography.h4>Database Configuration</Typography.h4>
                <Field
                  id="dbName"
                  name="databases[0].dbName"
                  label="Database Name"
                  component={Input}
                  validator={(value) =>
                    !value ? "Database name is required" : ""
                  }
                />
                <Field
                  id="username"
                  name="databases[0].username"
                  label="Username"
                  component={Input}
                  validator={(value) => (!value ? "Username is required" : "")}
                />
                <Field
                  id="password"
                  name="databases[0].password"
                  label="Password"
                  component={Input}
                  type="password"
                  validator={(value) => (!value ? "Password is required" : "")}
                />
              </>
            )}

            <div style={{ marginTop: "2rem" }}>
              <Button
                type="submit"
                themeColor={"primary"}
                disabled={loading || !formRenderProps.allowSubmit}
              >
                {loading ? "Deploying..." : "Deploy"}
              </Button>
            </div>
          </FormElement>
        )}
      />

      {result && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f7f7f7",
            borderRadius: "4px",
          }}
        >
          <Typography.h4>Deployment Result</Typography.h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DeploymentForm;
