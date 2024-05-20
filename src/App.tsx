import "./App.css";
import SignUpImageMobile from "./assets/images/illustration-sign-up-mobile.svg";
import SignUpImageDesktop from "./assets/images/illustration-sign-up-desktop.svg";
import SignupSuccess from "./assets/images/icon-success.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Input = {
  email: string;
};

type isSuccess = {
  isSuccess: boolean;
};

interface initialState extends Input, isSuccess {}

const initialState: initialState = {
  isSuccess: false,
  email: "",
};
function App() {
  const [formData, setformData] = useState(initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => {
    const { email } = data;
    setformData((prevState: initialState): initialState => {
      return {
        ...prevState,
        isSuccess: true,
        email: email,
      };
    });
  };
  const handleDismiss = () =>{
    setformData((prevState: initialState): initialState => {
      return {
        ...prevState,
        isSuccess: false,
        email: "",
      };
    });
  }

  return (
    <main>
      {formData.isSuccess ? (
        <section className="signup-success">
          <div className="grid-item-baseline"><img src={SignupSuccess} alt="" />
          <h2 className="title">Thanks for subscribing!</h2>
          <p>
            A confirmation email has been sent to <span className="user-email">{formData.email}</span> Please
            open it and click the button inside to confirm your subscription.
          </p></div>
          <button className="btn" onClick={handleDismiss}>Dismiss message</button>
        </section>
      ) : (
        <section className="signup">
          <div className="content">
            <h1 className="title"> Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul className="list" role="list">
              <li className="list__item">
                Product discovery and building what matters
              </li>
              <li className="list__item">
                Measuring to ensure updates are a success
              </li>
              <li className="list__item">And much more!</li>
            </ul>
            <form
              className="subcription-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-spaceout">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                {errors.email && (
                  <span id="error" className="error">
                    Valid email required
                  </span>
                )}
              </div>
              <input
                aria-describedby="error"
                type="email"
                id="email"
                className={`emailInput ${errors.email && `emailInputError`}`}
                placeholder="email@company.com"
                {...register("email", {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                })}
              />
              <button className="btn" type="submit">
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
          <picture>
            <source media="(min-width: 800px)" srcSet={SignUpImageDesktop} />
            <img src={SignUpImageMobile} alt="Sign up" />
          </picture>
        </section>
      )}
    </main>
  );
}

export default App;
