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
import React, { CSSProperties, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
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
import { ToastAction } from "@/components/ui/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FancyBorder from "../(boder-animation)/BorderAnimation";
import AISuggestions from "@/components/aiSuggestions";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  email: z.string().email(),
  state: z.string().min(1),
  cityOptions: z.array(
    z.object({
      city_name: z.string(),
    })
  ),
  city: z.string(),
  qualification: z.string().min(1),
  capitalInvestment: z.string().min(1),
  experience: z.string(),
  aiSuggestion: z.string().optional(),
});

const UserFormPage = (props: Props) => {
  const { toast } = useToast();
  const [drawer, setDrawer] = useState(false);
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      city: "",
      cityOptions: [],
      email: "",
      state: "",
      aiSuggestion: "",
    },
    shouldUnregister: false,
  });

  const Submit = async (formData: z.infer<typeof formSchema>) => {
    try {
      setDrawer(true);
      const { cityOptions, aiSuggestion, ...data } = formData;
      const res = await axios.get("/api/openAi", {
        params: data,
      });
      form.setValue("aiSuggestion", res.data);
    } catch (error) {
      setDrawer(false);
      toast({
        title: "job suggestion",
        description: "something went wrong",
        variant: "destructive",
      });
    }
  };

  const getAuthToken = async (
    fn: (authToken: { data: { auth_token: string } }) => void,
    REST_API: boolean
  ) => fn(await axios.get("/api/authToken", { params: { REST_API } }));

  const fetchData = async (
    authToken: { data: { auth_token: string } } | undefined
  ) => {
    const stateName = form.watch("state");
    try {
      form.setValue("city", "");

      const Authorization = authToken
        ? "Bearer " + authToken.data.auth_token
        : "";
      const response = await axios.get("/api/getCityList", {
        params: {
          stateName,
          Authorization,
        },
      });

      const data = await response.data;
      if (data?.error) throw data.error;
      form.setValue("cityOptions", data);
    } catch (error) {
      let toTokenGet = false;

      if (typeof error === "object" && error !== null && "name" in error) {
        const typedError: Record<"name", unknown> = error;
        toTokenGet = typedError?.name === "TokenExpiredError";
      }

      toast({
        title: "Api fetch Error",
        description: toTokenGet
          ? "TokenExpiredError"
          : "please referce page or select other state",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() =>
              toTokenGet ? getAuthToken(fetchData, true) : fetchData(undefined)
            }
          >
            Try again
          </ToastAction>
        ),
      });
      console.log(error);
    }
  };

  useEffect(() => {
    form.watch("state") && getAuthToken(fetchData, false);
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
      <div className="bg-[#242e4c9d] max-w-screen-xl flex-1 z-10  max-sm:mt-48">
        <section className="flex items-center gap-5 flex-col text-gray-300 py-3">
          <h6 className="text-xl font-medium">Don't give up</h6>
          <h3 className="text-3xl font-semibold">Just One Step</h3>
        </section>
        <section className="max-w-xl mx-auto text-gray-300 p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(Submit)}
              className="grid  grid-col-1 md:grid-cols-2   gap-4"
            >
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">City</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="bg-[#171f38]">
                        <SelectTrigger>
                          <SelectValue
                            className="text-slate-300"
                            placeholder="Select a city"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-[#171f38] text-slate-300">
                        {Array.isArray(form?.watch("cityOptions"))
                          ? form
                              ?.watch("cityOptions")
                              .map(({ city_name }, index) => (
                                <SelectItem key={index} value={city_name}>
                                  {city_name}
                                </SelectItem>
                              ))
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qualification"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Qualification
                    </FormLabel>
                    <FormControl className="bg-[#171f38]">
                      <Input
                        placeholder="Qualification"
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
                name="capitalInvestment"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Capital Investment
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                        value={field.value}
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
              <div className="sm:col-span-2 col-span-1 flex gap-4">
                <Button
                  onClick={() => {
                    form.reset();
                    form.setValue("experience", "");
                    form.setValue("capitalInvestment", "");
                    form.setValue("qualification", "");
                  }}
                  type="reset"
                  className="flex-1 bg-transparent border hover:border-transparent border-white transition-colors"
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </div>
      {borderStyle.map((object, index) => (
        <FancyBorder
          key={index}
          mode="tailwind"
          classNames="bg-[#121232] fixed "
          styles={object}
        />
      ))}
      <FormProvider {...form}>
        {drawer && <AISuggestions isOpen={drawer} setDrawer={setDrawer} />}
      </FormProvider>
    </article>
  );
};

export default UserFormPage;
