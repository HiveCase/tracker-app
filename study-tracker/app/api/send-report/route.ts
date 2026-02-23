import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { score } = await req.json();

    const data = await resend.emails.send({
      from: "tracker@resend.dev",
      to: "23f1003132@ds.study.iitm.ac.in",
      subject: "Weekly Study Score",
      html: `<h1>Your weekly score: ${score}</h1>`,
    });

    console.log("EMAIL RESULT:", data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("EMAIL ERROR:", e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}