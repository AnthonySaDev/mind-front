import styles from "./styles.module.css";

import { z } from "zod";
import { useForm } from 'react-hook-form'
import Cookies from "js-cookie";
import { axiosConfig } from "../../ultils/axios";

export default function Login() {
    const loginSchema = z.object({
        email: z
          .string()
          .min(1, 'O e-mail e necessário.')
          .email({ message: 'O e-mail e invalido .' }),
        password: z.string().min(1, 'A senha e necessária.'),
    })

    type LoginForm = z.infer<typeof loginSchema>
    
    const {
        register,
        handleSubmit
      } = useForm<LoginForm>({
        mode: 'onChange',
        defaultValues: {
          email: '',
          password: '',
        },
      })

    async function login({ email, password }: LoginForm) {
        try {
      
            const { data } = await axiosConfig("/account/login", {
              method: "patch",
              data: { email, password }
            });

            console.log(data)
      
            Cookies.set("token-user", data.data.token, { expires: 1 });
      
            window.location.href = "/"
          }catch(error) {
        
          }
    }
      
    return (
        <div className={styles.page}>
            <img className={styles.background} src="/login/background.png" alt="" />


            <div className={styles.container}>
                <img src="/login/giflogo.gif" alt="" />

                <form 
                    className={styles.form}
                    onSubmit={handleSubmit(login, (e) => console.error(e))}
                >

                    <input type="text" placeholder="E-Mail" {...register("email")}/>
                    <input type="text" placeholder="Password" {...register("password")}/>

                    <button type="submit">ENTRAR</button>
                </form>
            </div>
        </div>
    )
}

function zodResolver(loginSchema: z.ZodObject<{ email: z.ZodString; password: z.ZodString; }, "strip", z.ZodTypeAny, { email: string; password: string; }, { email: string; password: string; }>) {
    throw new Error("Function not implemented.");
}

