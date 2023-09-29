"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {useParams, useRouter} from 'next/navigation'
import * as z from "zod";
import axios from 'axios'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import UploadFile from "@/components/UploadFile";
import { useModel } from "@/hooks/use-model-store";
import { ChannelType } from "@/Models/schema-models";
import qs from "query-string";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";



const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }).refine(
    name => name !== 'general' , {
      message: "name cannot be 'general'"
    }
  ),
  type: z.nativeEnum(ChannelType)
});

const CreateChannel = () => {
    const {isOpen, onClose ,type } = useModel()
    const router = useRouter()
    const params = useParams()


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

        const url = qs.stringifyUrl({
          url:`/api/channels`,
          query:{
            serverId:params.serverId
          }
        })
        await axios.post(url,values)
        
        form.reset()
        router.refresh()
        onClose()
    } catch (error) {
       console.log("[FRONTED_CREATE_CHANNEL_ERROR] AT CREATE-CHANNEL MODEL",error)
    }
  };

  const handleClose = ( ) =>{
    form.reset();
    onClose()
  }

const isModelOpen = isOpen && type === "createChannel"

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center font-bold text-2xl">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-8">
               <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70"
                  >Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter channel Name" disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                  className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70"
                  >Channel Type</FormLabel>
                   <Select
                   disabled={isLoading}
                   defaultValue={field.value}
                   onValueChange={field.onChange}
                   >
                   <FormControl>
                   <SelectTrigger className="bg-zinc-300/50 border-0 outline-none text-black ring-0 focus:ring-offset-0 ring-offset-0 capitalize">
                     <SelectValue placeholder="Select a type to create a channel"/>
                   </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      {Object.values(ChannelType).map((type)=>(
                        <SelectItem
                        value={type}
                        key={type}
                        className="capitalize"
                        >
                          {type.toLowerCase()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                   </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <DialogFooter className="px-6 py-1">
               <Button variant="primary">
                  Create
               </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
