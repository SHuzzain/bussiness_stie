"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { formSchema } from "@/app/userInfo/(form)/page";
import * as z from "zod";
type Props = {
  isOpen?: boolean;
  setDrawer: (isOpen: boolean) => void;
};

const AISuggestions = (props: Props) => {
  const { isOpen, setDrawer } = props;
  const { watch, setValue, reset } = useFormContext();
  const restForm = () => {
    reset();
    setValue("experience", "");
    setValue("capitalInvestment", "");
    setValue("qualification", "");
    setDrawer(false);
  };
  return (
    <Drawer open={isOpen} onClose={restForm}>
      <DrawerContent className="bg-current">
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle className="text-white flex items-center gap-4">
              Job Suggetions{" "}
              {!watch("aiSuggestion") && (
                <div className="text-white flex items-center gap-3">
                  <small className="text-[8px] font-normal font-mono">
                    AI thinking
                  </small>
                  <div className="w-10 h-10 animate-spin bg-gradient-to-tr from-transparent to-slate-400 rounded-full border-dashed border-2 border-white"></div>
                </div>
              )}
              <DrawerClose
                className="ml-auto"
                onClick={() => {
                  setDrawer(false);
                  restForm();
                }}
              >
                <Button size={"icon"} variant={"ghost"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </DrawerClose>
            </DrawerTitle>
            {watch("aiSuggestion") && (
              <DrawerDescription className="overflow-y-auto h-72">
                <pre className="text-wrap text-white">
                  {watch("aiSuggestion")}
                </pre>
              </DrawerDescription>
            )}
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AISuggestions;
