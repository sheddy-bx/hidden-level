import https from "https";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const REVALIDATE_SECONDS = 10 * 60;

export async function GET(request: Request) {
  const route = "/staffing/v1/job-requisitions";
  const endpoint = new URL(route, process.env.ADP_API_BASE_URL as string);
  endpoint.searchParams.set("$filter", "requisitionStatusCode/codeValue eq ON");
  try {
    const cert = process.env.CERT_PEM;
    const key = process.env.KEY_PEM;

    // Create HTTPS agent with mTLS
    const httpsAgent = new https.Agent({
      cert,
      key,
      rejectUnauthorized: true, // Ensure the server certificate is verified
    });

    // Obtain OAuth2 token
    const token = await getAccessToken(httpsAgent);
    console.log({ token });

    // Make request to ADP API
    const adpResponse: AxiosResponse = await axios.get(endpoint.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    });

    return NextResponse.json(adpResponse.data, { status: 200 });
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { error: axiosError.message },
      { status: axiosError.response?.status || 500 }
    );
  }
}

async function getAccessToken(httpsAgent: https.Agent): Promise<string> {
  const auth = Buffer.from(
    `${process.env.ADP_CLIENT_ID}:${process.env.ADP_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response: AxiosResponse<{ access_token: string }> = await axios.post(
      `${process.env.ADP_API_BASE_URL}/auth/oauth/v2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpsAgent,
      }
    );

    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to retrieve access token");
  }
}
