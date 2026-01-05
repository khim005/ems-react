import { passwordRule, phoneRule } from "../../lib/rules/Regex";
import * as z from "zod";

export const LoginDTO = z.object({
  email: z.string().min(2, "Email Rquired").nonempty(),
  password: z.string().min(2, "Password Required").nonempty(),
})

//valitation msg
 export const RegisterDTO = z.object({
  fullName: z.string().min(2, "Name must have atlease 2 characters").max(50, "Name must be less than 50 characters").nonempty().trim(),
  email: z.email().nonempty(),
  phone: z.string().regex(phoneRule, "Phone must have 10 characters").nonempty(),
  password: z.string().regex(passwordRule, "Password must contain atleast 1 uppercase character, 1 lowercase character").nonempty(),
  confirmPassword: z.string().nonempty()
}).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"] })


export const CreateUserDTO = RegisterDTO.safeExtend({
  role: z.string().regex(/^(seller|customer)$/).default("customer"),
  gender: z.string().regex(/^(male|female|other)$/).nonempty().nonoptional(),
  image: z.file().min(200_000)
  // .mime(["image/gif","image/jpeg",'image/png','image/svg+xml','image/webp'])
  // address: z.object({
  //   province: z.string().regex(/^(koshi|madhesh|bagmati|gandaki|lumbini|sudurpaschim|karnali)$/),
  //   district: z.string(), 
  //   localBody: "",
  //   ward:"",
  //   tole: ""
  // })
})
// .refine((data) => {
//   // api call 
//   const prov = data.address.province  
//   const dist = data.address.district  
//   // api call dis

//   return true
// }, "address.district")
