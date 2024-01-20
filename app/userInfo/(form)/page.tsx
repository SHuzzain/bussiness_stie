"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { CSSProperties, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allStates } from "../(form_raw_value)/Options";
import { useToast } from "@/components/ui/use-toast";
import Error from "next/error";
import { ToastAction } from "@/components/ui/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FancyBorder from "../(boder-animation)/BorderAnimation";

type Props = {};

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  email: z.string().email(),
  state: z.string(),
  cityOptions: z.array(
    z.object({
      city_name: z.string(),
    })
  ),
  city: z.string(),
  qulification: z.string(),
  capitalInvesment: z.string(),
  experience: z.string(),
});

const UserFormPage = (props: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      capitalInvesment: "",
      city: "",
      cityOptions: [],
      email: "",
      experience: "",
      qulification: "",
      state: "",
    },
  });

  const Submit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const fetchData = async () => {
    const stateName = form.watch("state");
    if (!stateName) return;
    try {
      form.setValue("city", "");
      const response = await fetch(
        `https://www.universal-tutorial.com/api/cities/${stateName}`,
        {
          headers: {
            Authorization:
              "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN_STATE,
            Accept: "*/*",
          },
          next: { revalidate: 60 * 60 * 24 },
        }
      );
      const data = await response.json();
      form.setValue("cityOptions", data);
    } catch (error) {
      toast({
        title: "Api fetch Error",
        description: "please referce page or select other state",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => fetchData()}>
            Try again
          </ToastAction>
        ),
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [form.watch("state")]);
  const borderStyle: CSSProperties[] = [
    {
      borderRadius: "30% 70% 58% 42% / 30% 38% 62% 70%",
      width: 1000,
      height: 1000,
      left: "2%",
    },
    {
      borderRadius: "61% 39% 58% 42% / 62% 57% 43% 38% ",
      width: 500,
      height: 500,
      right: "5%",
      top: "1%",
    },
  ];
  return (
    <article className="bg-[#171f38] h-full flex justify-center items-center">
      <div className="bg-[#242e4c9d] max-w-screen-xl flex-1 z-10">
        <section className="flex items-center gap-5 flex-col text-gray-300 py-3">
          <h6 className="text-xl font-medium">Don't give up</h6>
          <h3 className="text-3xl font-semibold">Just One Step</h3>
        </section>
        <section className="max-w-xl mx-auto text-gray-300 py-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(Submit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Username</FormLabel>
                    <FormControl className="bg-[#171f38]">
                      <Input
                        placeholder="first Name"
                        {...field}
                        className="placeholder:text-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                rules={{
                  required: true,
                }}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email Id</FormLabel>
                    <FormControl className="bg-[#171f38]">
                      <Input
                        placeholder="Your Email address"
                        type="email"
                        className="placeholder:text-slate-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                rules={{
                  required: true,
                }}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-[#171f38]">
                        <SelectTrigger>
                          <SelectValue
                            className="text-slate-300"
                            placeholder="Select a state"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-[#171f38] text-slate-300">
                        {allStates.map((value, index) => (
                          <SelectItem key={index} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                rules={{
                  required: true,
                }}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-[#171f38]">
                        <SelectTrigger>
                          <SelectValue
                            className="text-slate-300"
                            placeholder="Select a city"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-[#171f38] text-slate-300">
                        {form
                          .watch("cityOptions")
                          .map(({ city_name }, index) => (
                            <SelectItem key={index} value={city_name}>
                              {city_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qulification"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Qulification
                    </FormLabel>
                    <FormControl className="bg-[#171f38]">
                      <Input
                        placeholder="Qulification"
                        {...field}
                        className="placeholder:text-slate-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capitalInvesment"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Capital Invesment
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-[#171f38]">
                        <SelectTrigger>
                          <SelectValue
                            className="text-slate-300"
                            placeholder="Select a scale"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-[#171f38] text-slate-300">
                        {["Small scale", "Large scale"].map((val, index) => (
                          <SelectItem key={index} value={val}>
                            {val}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="text-slate-300">
                      One year experience
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center !mt-0"
                      >
                        {["Yes", "No"].map((val, index) => (
                          <FormItem
                            key={index}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={val} />
                            </FormControl>
                            <FormLabel className="font-normal ">
                              {val}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" hidden className="mt-3">
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </div>
      {borderStyle.map((object, index) => (
        <FancyBorder
          key={index}
          mode="tailwind"
          classNames="bg-[#121232] fixed [animation:_spin_10s_linear_infinite]"
          styles={object}
        />
      ))}
    </article>
  );
};

export default UserFormPage;
