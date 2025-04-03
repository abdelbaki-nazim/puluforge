"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Typography } from "@progress/kendo-react-common";
import styles from "./LandingPage.module.css";

const featureData = [
  {
    id: 1,
    title: "Intelligent Insights",
    description:
      "Harness the power of AI to uncover hidden patterns and make data-driven decisions with unparalleled precision.",
    action: "Learn More",
  },
  {
    id: 2,
    title: "Seamless Integration",
    description:
      "Effortlessly integrate our AI into your workflow, enhancing productivity without disrupting your rhythm.",
    action: "Explore Now",
  },
  {
    id: 3,
    title: "Futuristic Design",
    description:
      "Experience a sleek, modern interface that feels like a glimpse into tomorrow, today.",
    action: "See the Magic",
  },
];

// Custom cell for the action button in the grid
const ActionCell = (props: any) => (
  <td>
    <Button
      themeColor="info"
      onClick={() => alert(`Action: ${props.dataItem.action}`)}
    >
      {props.dataItem.action}
    </Button>
  </td>
);

const AILandingPage = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Typography.h1 className={styles.heroTitle}>
          Unleash the Power of AI
        </Typography.h1>
        <Typography.p className={styles.heroSubtitle}>
          Transform your world with cutting-edge artificial intelligence.
          Discover a future where innovation knows no bounds.
        </Typography.p>
        {!session ? (
          <Button
            themeColor="primary"
            size="large"
            onClick={() => signIn("github")}
            className={styles.heroButton}
          >
            Get Started with GitHub
          </Button>
        ) : (
          <div className={styles.userSection}>
            <Typography.p>
              Welcome, {session.user?.name || session.user?.login}!
            </Typography.p>
            <Button themeColor="secondary" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        )}
      </section>

      {/* Features Section with Kendo Grid */}
      <section className={styles.features}>
        <Typography.h2 className={styles.sectionTitle}>
          Why Choose Our AI?
        </Typography.h2>
        <Grid
          data={featureData}
          className={styles.featureGrid}
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <GridColumn field="title" title="Feature" width="200px" />
          <GridColumn field="description" title="Description" />
          <GridColumn
            title="Action"
            cell={ActionCell}
            width="150px"
            className={styles.actionColumn}
          />
        </Grid>
      </section>

      {/* Extra Text Section */}
      <section className={styles.extraText}>
        <Typography.h2 className={styles.sectionTitle}>
          A Vision Beyond Tomorrow
        </Typography.h2>
        <Typography.p className={styles.extraParagraph}>
          Step into a realm where artificial intelligence doesn’t just solve
          problems—it redefines possibilities. Our platform is built for
          dreamers, innovators, and pioneers who dare to imagine a smarter, more
          connected world. With every interaction, you’re not just using
          AI—you’re shaping the future.
        </Typography.p>
      </section>

      {/* User Info (if logged in) */}
      {session && (
        <section className={styles.userInfo}>
          <Typography.h3>Your Profile</Typography.h3>
          <Typography.p>ID: {session.user?.id}</Typography.p>
          <Typography.p>GitHub Username: {session.user?.login}</Typography.p>
          <Typography.p>
            Email: {session.user?.email || "Not provided"}
          </Typography.p>
          <Typography.p>
            Bio: {session.user?.bio || "No bio available"}
          </Typography.p>
          <Typography.p>
            Company: {session.user?.company || "Not specified"}
          </Typography.p>
          <Typography.p>
            Location: {session.user?.location || "Unknown"}
          </Typography.p>
        </section>
      )}
    </div>
  );
};

export default AILandingPage;
