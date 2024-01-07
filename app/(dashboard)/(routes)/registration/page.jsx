"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage 
} from "@/components/ui/avatar"

import { colleges, branches, batches, tshirtSizeValue, knowAbout } from "@/public/constants";


const RegistrationForm = () => {
  
  const neonTextStyle = {
    marginTop: '5vh',
    marginBottom: '5vh',
    fontFamily: 'Helvetica Neue, sans-serif',
    // backgroundColor: '#010a01',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 100,
    textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa',
    animation: 'flicker 1.5s infinite alternate',
    color: '#fff',
  };

  const RegistrationFormSchema = z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(2, { message: "Name must be 5 or more characters long" } ),
    email: z.string().email(),
    mobile: z.string().min(10, { message: "Mobile no. must be 10 digits"}).max(10, { message: "Mobile no. must be 10 digits"}),
    password: z.string().min(8, { message: "Password must be longer than 8 characters"} ),
    confirmPassword: z.string(),
    gender: z.enum(['Male', 'Female'],  { message: "Select a valid option"} ),
    college: z.string({ message: "Must be a valid College Name"}),
    branch: z.string({ message: "Must be a valid branch"}),
    batch: z.string({ message: "Must be a valid batch"}),
    knowAbout: z.string({ message: "Select a valid option"}),
    accomodation: z.enum(['Yes', 'No'], { message: "Select a valid option"} ),
    tShirt: z.enum(['Yes', 'No'], { message: "Select a valid option"} ),
    tShirtSize: z.optional(),
    paymentMethod: z.enum(['ca', 'ba'], { message: "Select a valid option"} ),  
    otherCollege: z.string().optional(),
    ca_no_ba: z.string().optional(),
    ca_no_ca: z.string().optional(),
    trx_id: z.string().optional(),
    trx_img: z
    .any()
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must be same.',
    path: ["confirmPassword"],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccessfulPopup, setIsRegistrationSuccessfulPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [openPop, setOpenPop] = useState(false);  
  const [file,setFile] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(RegistrationFormSchema),
    mode: "onChange",
  })
  const fileHandler = (e) =>{
    console.log("File Handler")
    console.log(e.target.files);
    setFile(e.target.files[0])
  }

  const handleRegistrationSuccessfulPopupRedirect = () => {
    setIsRegistrationSuccessfulPopup(false);
    router.push('/sign-in');
  };

  const handleRegistrationSuccessfulPopupCancel = () => {
    setIsRegistrationSuccessfulPopup(false);
    router.push('/sign-in');
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRegistrationSuccessfulPopup) {
        setIsRegistrationSuccessfulPopup(false);
        router.push('/sign-in');
      }
    }, 20000); // Redirect to sign-in page after 20 seconds if popup is not closed
    return () => clearTimeout(timer);
  }, [isRegistrationSuccessfulPopup]);

  const onSubmit = async (data) => {    
    setIsLoading(true);

    if (data.college!='other') {
      data.otherCollege=null;
    };

    // const obj = {
    //   name: data.name,
    //   email: data.email,
    //   mobile: data.mobile,
    //   password: data.confirmPassword,
    //   gender: data.gender,
    //   college: data.college == 'other' ? data.otherCollege : data.college,
    //   branch: data.branch,
    //   batch: data.batch,
    //   knowAbout: data.knowAbout,
    //   accomodation: data.accomodation,
    //   tShirtSize: data.tShirt==="No"?"No":data.tShirtSize,
    //   paymentMethod: data.paymentMethod,
    //   ca_no: data.ca_no_ba == null ? data.ca_no_ca : data.ca_no_ba,
    //   transaction_id: data.trx_id == null ? data.ca_no_ca : data.trx_id,
    // };

    const conditionalAmount = data.college === 'Katihar Engineering College, Katihar' && data.tShirt === 'No'
    ? 200
    : data.college === 'Katihar Engineering College, Katihar' && data.tShirt === 'Yes'
    ? 500
    : data.college != 'Katihar Engineering College, Katihar' && data.tShirt === 'No'
    ? 300
    : data.college != 'Katihar Engineering College, Katihar' && data.tShirt === 'Yes'? 600: 600 ;

    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("mobile",data.mobile);
    formData.append("password",data.confirmPassword);
    formData.append("gender",data.gender);
    formData.append("college",data.college);
    formData.append("branch",data.branch);
    formData.append("batch",data.batch);
    formData.append("knowAbout",data.knowAbout);
    formData.append("accomodation",data.accomodation);
    formData.append("tShirtSize",data.tShirtSize);
    formData.append("paymentMethod",data.paymentMethod);
    formData.append("ca_no",data.ca_no_ba == null ? data.ca_no_ca : data.ca_no_ba);
    formData.append("transaction_id",data.trx_id == null ? data.ca_no_ca : data.trx_id);
    formData.append("screenshot",file);
    formData.append("registrationFee", conditionalAmount);

    try {
      const toastId = toast.loading("Creating Account...")
      const { data } = await axios.post("/api/signup", formData);
      toast.dismiss(toastId);
      setIsLoading(false);
      if (data.success) { 
        toast.success("Registered Successfully!");
        setUser(data.savedUser);
        console.log(user)
        setIsRegistrationSuccessfulPopup(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
    // const fileRef = form.register('file', { required: true });

  return (
            
    <React.Fragment>
      <div className="text-center mb-4 text-border flex-col">
        <h1 className="font-bold text-[3rem] text-border-white" style={{ ...neonTextStyle }}>TechFusion&apos;24 Registration</h1>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-center bg-emerald-100">
          <CardHeader>
            <CardTitle>Already Registered ?</CardTitle>
          </CardHeader>
          <CardContent>
                <Button className='justify-center' variant="" onClick={()=>{router.push('/sign-in')}}>Sign In Now</Button>
          </CardContent>
        </Card>
        <Card className="mx-auto w-4/5 max-w-xl mt-2 mb-2 text-left">
          <CardHeader>
            <CardTitle>For all your queries, feel free to contact:</CardTitle>
            <CardDescription />
          </CardHeader>
          <CardContent className="grid gap-4 lg:gap-2 lg:grid-cols-2">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="avatar_02.png" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="gap-1">
                  <p className="text-sm font-medium leading-none">Mohit Kumar</p>
                  <a href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917257827104</a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="avatar_02.png" />
                  <AvatarFallback>KG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Kumar Gaurav</p>
                  <a href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917004174269</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-left">
          <CardContent>
              <div className="flex items-center pt-4">
                <p className="font-semibold font-mono">Remember your password to avoid password recovery hassle and protect your account.</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex flex-col items-center mb-8">
          <div className="mx-auto w-4/5 gap-2 lg:grid lg:grid-cols-2 lg:gap-4 max-w-xl mb-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Full Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Full Name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Email*</FormLabel>
                    <FormControl>
                    <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Mobile No*</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter 10 digit Mobile Number" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Password*</FormLabel>
                    <FormControl>
                    <Input placeholder="Password" {...field} type="password" />

                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Confirm Password*</FormLabel>
                    <FormControl>
                    <Input placeholder="Confirm Password" {...field} />

                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Gender*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select Gender" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">College*</FormLabel>
                  <Popover open={openPop} onOpenChange={setOpenPop} >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? colleges.find(
                                (college) => college.value === field.value
                              )?.label
                            : "Select College"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
                        <CommandEmpty>No College found.</CommandEmpty>
                        <ScrollArea className="h-48 overflow-auto">
                          <CommandGroup>
                            {colleges.map((college) => (
                              <CommandItem
                                value={college.label}
                                key={college.value}
                                onSelect={() => {
                                  form.setValue("college", college.value);
                                  setOpenPop(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    college.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {college.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    If you don&apos;t find your college in the list select other. 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />        
            {form.watch('college') === "other" && (
            <FormField
                control={form.control}
                name="otherCollege"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">College Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter College Name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-white">Branch*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder= "Select Branch" />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                          {branches &&
                            branches.map((item, index) => (
                              <SelectItem key={index}
                                value={item.value}
                              >{`${item.label}`}</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                      <FormDescription />
                      <FormMessage />
                  </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Batch*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select Batch" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {batches &&
                          batches.map((item, index) => (
                            <SelectItem key={index}
                              value={item.value}
                            >{item.label}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="knowAbout"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">How did you came to know about TechFusion&apos;24?*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select One" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {knowAbout &&
                          knowAbout.map((item, index) => (
                            <SelectItem key={index}
                              value={item.value}
                            >{item.label}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="accomodation"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Do you need Accomodation?*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select One"} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {form.watch('accomodation')==='Yes' && <FormDescription>Accomodation is chargable and is not included in the registration fee, &#8377; 50/day will be collected while allotment of room.</FormDescription>}
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="tShirt"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Do you want TechFusion exclusive T-Shirt?*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select One"} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {form.watch('tShirt')==='Yes' && <FormDescription>T-Shirt is chargable and an amount of &#8377; 300 will automatically be added to you registration fee shown below.</FormDescription>}
                    <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('tShirt') === "Yes" && (
              <FormField
                control={form.control}
                name="tShirtSize"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-white">T-Shirt Size*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder= "Select One" />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                          {tshirtSizeValue &&
                            tshirtSizeValue.map((item, index) => (
                              <SelectItem key={index}
                                value={item.value}
                              >{item.label}</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                      <FormDescription/>
                      <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Payment Method*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder= "Select One" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="ba">Through Bank Account</SelectItem>
                        <SelectItem value="ca">Through Campus Ambassador</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />  
          </div>
          {form.watch('paymentMethod') === "ba" && (
          <div className="mx-auto w-4/5 gap-2 lg:gap-4 max-w-xl">
            <h1 className="font-bold text-xl text-white underline mb-2 pb-2">Bank Account</h1>
            <Card className="mx-auto max-w-xl mb-4 text-left">
              <CardContent>
                  <div className="flex items-center pt-4">
                  <p className="font-semibold font-mono">
                      Participants can pay registration fee of{' '}
                      <span className="font-bold"> 
                        {form.watch('college') === 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'No'
                          ? 'Rs. 200/-'
                          : form.watch('college') === 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'Yes'
                          ? 'Rs. 500/-'
                          : form.watch('college') != 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'No'
                          ? 'Rs. 300/-'
                          : form.watch('college') != 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'Yes'? 'Rs. 600/-': 'Rs. 600/-'}
                      </span>{' '}
                      on following bank account and upload the screenshot of payment:
                    </p>
                  </div>
              </CardContent>
            </Card>
            <div className="text-white mb-3">
              <span>
                <h1 className="font-bold text-xl text-red-400 underline mb-2">Bank Account Details:</h1>
                <p>A/c No. - 256312010000302</p>
                <p>A/c Holder/Name - Katihar Engineering College SDF Account</p>
                <p>IFSC code - UBIN0554031</p>
                <p>Bank - Union Bank of India</p>
                <p>Branch - Mangal Market Road, Katihar (BH)</p>
              </span>
            </div>
            <FormField
                control={form.control}
                name="ca_no_ba"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Campus Ambassador Code</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter CA code" {...field} />
                    </FormControl>
                    <FormDescription>Ask your college&apos;s CA for code or else can leave blank.</FormDescription>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="trx_id"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-white">Transection Id*</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter Transection Id" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
          </div>
          )}
          {form.watch('paymentMethod') === "ca" && (
            <div className="mx-auto w-4/5 gap-2 lg:gap-4 max-w-xl">
              <h1 className="font-bold text-xl text-white underline mb-2 pb-2">Campus Ambassador</h1>
              <Card className="mx-auto max-w-xl mb-4 text-left">
                <CardContent>
                    <div className="flex items-center pt-4">
                    <p className="font-semibold font-mono">Participants can pay registration fee of{' '}
                      <span className="font-bold">
                      {form.watch('college') === 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'No'
                          ? 'Rs. 200/-'
                          : form.watch('college') === 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'Yes'
                          ? 'Rs. 500/-'
                          : form.watch('college') != 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'No'
                          ? 'Rs. 300/-'
                          : form.watch('college') != 'Katihar Engineering College, Katihar' && form.watch('tShirt') === 'Yes'? 'Rs. 600/-': 'Rs. 600/-'}
                      </span>{' '}
                      to Campus Ambassador of their college.</p>
                    </div>
                </CardContent>
              </Card>
              <FormField
                  control={form.control}
                  name="ca_no_ca"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-white">Campus Ambassador Code*</FormLabel>
                      <FormControl>
                      <Input placeholder="Enter CA code" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.watch('paymentMethod')  && (
            <div className="mx-auto w-4/5 lg:w-full max-w-xl mb-6 mt-2">
              <FormField
                  control={form.control}
                  name="trx_img"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel className="text-white">Screenshot of Payment (less than 3 mb)*</FormLabel>
                      <FormControl className= "text-white">
                      {/* <Input type="file" onChange={fileHandler} {...field} accept="image/*"/> */}
                      <input type="file" name="trx_img" onChange={fileHandler} accept="image/*"/>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 duration-300 relative rounded-2xl border border-transparent bg-gray-900 text-white px-5 py-2 hover:bg-purple-500 flex items-center border-white hover:border-none" >Register</Button>
        </form>
      </Form>
      
      {isRegistrationSuccessfulPopup && user && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md w-4/5 lg:w-2/5">
              <h2 className="mb-2 text-center font-extrabold">Registration Successful!</h2>
              <p className="font-mono mb-2">Welcome{' '}<b>{user.name?user.name:'not available'}</b>{' '}!</p>
              <p className="font-mono mb-2">Email: {user.email?user.email:'not available'}</p>
              <p className="font-mono mb-2">Your TechFusion Id: {user.festId?user.festId:'not available'}</p>
              <p className="italic font-serif mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">It may take upto 24-48 hours for us to verify your payment.</p>
              <p>
                Join our WhatsApp group to stay updated with latest information about the TechFusion&apos;24:{' '}
                <Badge variant="outline" className=" bg-emerald-100">
                  <a className="flex flex-row items-center underline decoration-double decoration-emerald-400" href='https://chat.whatsapp.com/KP8wjZXRu88DQ21FJLGZpX' target="_blank" rel="noopener noreferrer">
                  Join Now<MousePointerClick className="ml-2"/>
                  </a>
                </Badge>
              </p>
              <div className='flex flex-row gap-6 mt-8 justify-center'>
              <Button variant="" onClick={handleRegistrationSuccessfulPopupRedirect}>Go to Sign In</Button>
              <Button variant="destructive" onClick={handleRegistrationSuccessfulPopupCancel}>Cancel</Button>
              </div>
            </div>
          </div>
      )}
    </React.Fragment>
  )
}

export default RegistrationForm;
