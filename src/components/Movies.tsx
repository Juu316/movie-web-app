"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Movies = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-2xl font-semibold">Upcoming</h3>
        <Link
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
          href="/upcoming">
          "See more" <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Movies;
