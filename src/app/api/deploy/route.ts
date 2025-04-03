import { NextResponse } from "next/server";
import { runDeployment } from "../../../../../pulumi/deploy";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const outputs = await runDeployment(body);

    return NextResponse.json({ message: "Deployment succeeded", outputs });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
