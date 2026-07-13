import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import { Education } from "@/utils/models/education";
import { Experience } from "@/utils/models/experience";
import { Project } from "@/utils/models/project";
import { PersonalData } from "@/utils/models/personal-data";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    await dbConnect();
    const type = (await params).type;

    switch (type) {
      case "educations":
        const educations = await Education.find().sort({ order: 1 });
        return NextResponse.json(educations);
      case "experiences":
        const experiences = await Experience.find().sort({ order: 1 });
        return NextResponse.json(experiences);
      case "projects":
        const projects = await Project.find().sort({ order: 1 });
        return NextResponse.json(projects);
      case "personal-data":
        const personalData = await PersonalData.findOne();
        return NextResponse.json(personalData);

      default:
        return NextResponse.json(
          { error: "Invalid data type" },
          { status: 400 },
        );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const type = (await params).type;
    const body = await request.json();

    let result;

    switch (type) {
      case "educations":
        result = await Education.create(body);
        break;
      case "experiences":
        result = await Experience.create(body);
        break;
      case "projects":
        result = await Project.create(body);
        break;
      case "personal-data":
        // Usually there is only one personal data document
        const existingData = await PersonalData.findOne();
        if (existingData) {
          Object.assign(existingData, body);
          await existingData.save();
          result = existingData;
        } else {
          result = await PersonalData.create(body);
        }
        break;

      default:
        return NextResponse.json(
          { error: "Invalid data type" },
          { status: 400 },
        );
    }

    // Invalidate the homepage cache so updates appear immediately
    revalidatePath("/", "layout");

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
