import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
        email: '',
        password: ''
    }
  });
  const { register, handleSubmit, formState, reset } = form;
  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  console.log({ isDirty, isValid });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful });

  const onSubmit = (data: LoginFormValues) => {
    console.log("form submit");
    console.log(data);
    console.log(formState);
    console.log(errors);
  };

  const onError = (errors: FieldErrors<LoginFormValues>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format.",
            },
            validate: {
              // notAdmin: (fieldValue) => {
              //     return fieldValue !== "admin@example.com" || "Email or password is wrong."
              // },
              // emailAvailable: async (fieldValue) => {
              //     const res = await fetch('users/email=fieldvalue')
              //     const data = await res.json()
              //     return data.length = 0 || 'Email already exist'
              // }
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <p className="error">{errors.password?.message}</p>
      </div>

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default LoginForm;