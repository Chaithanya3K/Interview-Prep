// // import { generateText } from "ai";
// // import { google } from "@ai-sdk/google";

// // import { db } from "@/firebase/admin";
// // import { getRandomInterviewCover } from "@/lib/utils";

// // export async function POST(request: Request) {
// //   const { type, role, level, techstack, amount, userid } = await request.json();

// //   try {
// //     const { text: questions } = await generateText({
// //       model: google("gemini-1.5-flash"),
// //       prompt: `Prepare questions for a job interview.
// //         The job role is ${role}.
// //         The job experience level is ${level}.
// //         The tech stack used in the job is: ${techstack}.
// //         The focus between behavioural and technical questions should lean towards: ${type}.
// //         The amount of questions required is: ${amount}.
// //         Please return only the questions, without any additional text.
// //         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
// //         Return the questions formatted like this:
// //         ["Question 1", "Question 2", "Question 3"]
        
// //         Thank you! <3
// //     `,
// //     });

// //     const interview = {
// //       role: role,
// //       type: type,
// //       level: level,
// //       techstack: techstack.split(","),
// //       questions: JSON.parse(questions),
// //       userId: userid,
// //       finalized: true,
// //       coverImage: getRandomInterviewCover(),
// //       createdAt: new Date().toISOString(),
// //     }

// //     await db.collection("interviews").add(interview);

// //     return Response.json({ success: true }, { status: 200 });
// //   } catch (error) {
// //     console.error("Error:", error);
// //     return Response.json({ success: false, error: error }, { status: 500 });
// //   }
// // }

// // export async function GET() {
// //   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// // }


// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const role = body.role || "frontend";
//     const level = body.level || "senior";
//     const techstack = body.techstack || "next.js";
//     const amount = body.amount || "3";

//     const prompt = `
// Prepare ${amount} interview questions.
// Job role is ${role}.
// Experience level is ${level}.
// Tech stack is ${techstack}.
// Include both technical and behavioral questions.
// Return ONLY a JSON array of plain questions.
// Do not include any extra text.
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // ✅ free credits supported
//       temperature: 0,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const text = completion.choices[0].message.content || "[]";

//     let questions: string[];

//     try {
//       questions = JSON.parse(text);
//     } catch {
//       questions = text
//         .split("\n")
//         .map((q) => q.trim())
//         .filter(Boolean);
//     }

//     // Safety fallback
//     if (!questions || questions.length === 0) {
//       questions = [
//         "Explain how Next.js handles server side rendering",
//         "How do you optimize performance in large React applications",
//         "Describe a challenging frontend problem you solved",
//       ];
//     }

//     return NextResponse.json({
//       success: true,
//       questions,
//     });
//   } catch (error: any) {
//     console.error("OpenAI API error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }


// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";

// import { db } from "@/firebase/admin";
// import { getRandomInterviewCover } from "@/lib/utils";

// export async function POST(request: Request) {
//   const { type, role, level, techstack, amount, userid } = await request.json();

//   try {
//     const { text: questions } = await generateText({
//       model: google("gemini-1.5-flash"),
//       prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
//     });

//     const interview = {
//       role: role,
//       type: type,
//       level: level,
//       techstack: techstack.split(","),
//       questions: JSON.parse(questions),
//       userId: userid,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     }

//     await db.collection("interviews").add(interview);

//     return Response.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return Response.json({ success: false, error: error }, { status: 500 });
//   }
// }

// export async function GET() {
//   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// }


// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const role = body.role || "frontend";
//     const level = body.level || "senior";
//     const techstack = body.techstack || "next.js";
//     const amount = body.amount || "3";

//     const prompt = `
// Prepare ${amount} interview questions.
// Job role is ${role}.
// Experience level is ${level}.
// Tech stack is ${techstack}.
// Include both technical and behavioral questions.
// Return ONLY a JSON array of plain questions.
// Do not include any extra text.
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // ✅ free credits supported
//       temperature: 0,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const text = completion.choices[0].message.content || "[]";

//     let questions: string[];

//     try {
//       questions = JSON.parse(text);
//     } catch {
//       questions = text
//         .split("\n")
//         .map((q) => q.trim())
//         .filter(Boolean);
//     }

//     // Safety fallback
//     if (!questions || questions.length === 0) {
//       questions = [
//         "Explain how Next.js handles server side rendering",
//         "How do you optimize performance in large React applications",
//         "Describe a challenging frontend problem you solved",
//       ];
//     }

//     return NextResponse.json({
//       success: true,
//       questions,
//     });
//   } catch (error: any) {
//     console.error("OpenAI API error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
// }



// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// import { db } from "@/firebase/admin";
// import { getRandomInterviewCover } from "@/lib/utils";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   const { type, role, level, techstack, amount, userid } =
//     await request.json();

//   try {
//     const prompt = `
// Prepare questions for a job interview.
// The job role is ${role}.
// The job experience level is ${level}.
// The tech stack used in the job is: ${techstack}.
// The focus between behavioural and technical questions should lean towards: ${type}.
// The amount of questions required is: ${amount}.
// Please return only the questions, without any additional text.
// The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
// Return the questions formatted like this:
// ["Question 1", "Question 2", "Question 3"]
// `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // works with free credits
//       temperature: 0,
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const text = completion.choices[0].message.content || "[]";

//     let questions: string[];

//     try {
//       questions = JSON.parse(text);
//     } catch {
//       questions = text
//         .split("\n")
//         .map((q) => q.replace(/^\d+[\).\s]*/, "").trim())
//         .filter(Boolean);
//     }

//     const interview = {
//       role: role,
//       type: type,
//       level: level,
//       techstack: techstack.split(","),
//       questions: questions,
//       userId: userid,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     };

//     await db.collection("interviews").add(interview);

//     return NextResponse.json(
//       { success: true },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json(
//     { success: true, data: "Thank you!" },
//     { status: 200 }
//   );
// }


import { NextResponse } from "next/server";
import OpenAI from "openai";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } =
    await request.json();

  try {
    const prompt = `
Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // works with free credits
      temperature: 0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0].message.content || "[]";

    let questions: string[];

    try {
      questions = JSON.parse(text);
    } catch {
      questions = text
        .split("\n")
        .map((q) => q.replace(/^\d+[\).\s]*/, "").trim())
        .filter(Boolean);
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: true, data: "Thank you!" },
    { status: 200 }
  );
}
