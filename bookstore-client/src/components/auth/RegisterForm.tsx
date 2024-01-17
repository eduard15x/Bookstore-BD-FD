import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
};

const RegisterForm: React.FC = () => {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
    },
    mode: 'onSubmit'
  });
  const { register, handleSubmit, formState, reset, watch, control } = form;
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

  const onSubmit = (data: RegisterFormValues) => {
    console.log("form submit");
    console.log(data);
    console.log(formState);
    console.log(errors);
  };

  const onError = (errors: FieldErrors<RegisterFormValues>) => {
    console.log(errors);
  };

  const currentPassword = watch('password');

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div>
        <label htmlFor="fullName">Full name</label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: {
              value: true,
              message: "Full name is required",
            },
          })}
        />
        <p className="error">{errors.fullName?.message}</p>
      </div>

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
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address."
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("typeless.ai") ||
                  "This domain is not supported"
                );
              },
              //   emailAvailable: async (fieldValue) => {
              //       const res = await fetch('users/email=fieldvalue')
              //       const data = await res.json()
              //       return data.length = 0 || 'Email already exist'
              //   }
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
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Password is not strong enough. At least 1 lowercase and 1 uppercase letter, 1 digit, 1 special character, min 8 length.",
              //   ^: Start of the string.
              // (?=.*[a-z]): Positive lookahead for at least one lowercase letter.
              // (?=.*[A-Z]): Positive lookahead for at least one uppercase letter.
              // (?=.*\d): Positive lookahead for at least one digit.
              // (?=.*[@$!%*?&]): Positive lookahead for at least one special character (you can customize this character set).
              // [A-Za-z\d@$!%*?&]{8,}: Match at least 8 characters that can be letters (uppercase or lowercase), digits, or the specified special characters.
              // $: End of the string.
            },
          })}
        />
        <p className="error">{errors.password?.message}</p>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password is required",
            },
            validate: {
              notMatch: (fieldValue) => {
                return (
                  fieldValue === currentPassword || "Passwords don't match."
                );
              },
            },
          })}
        />
        <p className="error">{errors.confirmPassword?.message}</p>
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          {...register("address", {
            required: {
              value: true,
              message: "Address is required",
            },
          })}
        />
        <p className="error">{errors.address?.message}</p>
      </div>

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
        <DevTool control={control} />
    </form>
  );
};

export default RegisterForm;