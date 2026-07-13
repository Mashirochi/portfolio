import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import { Education } from "@/utils/models/education";
import { Experience } from "@/utils/models/experience";
import { Project } from "@/utils/models/project";
import { PersonalData } from "@/utils/models/personal-data";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { type, id } = await params;
    const body = await request.json();

    let result;

    switch (type) {
      case "educations":
        result = await Education.findByIdAndUpdate(id, body, { new: true });
        break;
      case "experiences":
        result = await Experience.findByIdAndUpdate(id, body, { new: true });
        break;
      case "projects":
        result = await Project.findByIdAndUpdate(id, body, { new: true });
        break;
      case "personal-data":
        result = await PersonalData.findByIdAndUpdate(id, body, { new: true });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid data type" },
          { status: 400 },
        );
    }

    // Invalidate the homepage cache
    revalidatePath("/", "layout");

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { type, id } = await params;

    switch (type) {
      case "educations":
        await Education.findByIdAndDelete(id);
        break;
      case "experiences":
        await Experience.findByIdAndDelete(id);
        break;
      case "projects":
        await Project.findByIdAndDelete(id);
        break;
      case "personal-data":
        await PersonalData.findByIdAndDelete(id);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid data type" },
          { status: 400 },
        );
    }

    // Invalidate the homepage cache
    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
