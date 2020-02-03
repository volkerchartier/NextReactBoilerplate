import React from "react";
import JobList from "../components/joblist";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import css from "./styles.scss";
// import Button from "react-bulma-components/src/components/button";
import {
  Pushlayout,
  Sidebar,
  Content,
  PushLayoutContext
} from "@hi5/pushlayout";

import { Button } from "@hi5/button";

import { Formik } from "formik";

const Index = () => {
  // our query that defines the attributes we want to get.
  const JOBS_QUERY = gql`
    query {
      jobs {
        id
        title
        applyUrl
        company {
          name
        }
      }
    }
  `;

  // the hook that calls the query.
  const jobs = useQuery(JOBS_QUERY);

  return (
    <div className={css.example}>
      <Pushlayout>
        <Sidebar></Sidebar>
        <Content>
          <h1>GraphQL Job Board</h1>
          <p>A list of open GraphQL jobs.</p>
          <Button round isSize="huge">
            Button
          </Button>
          <Button round icon="airplane" />

          <div>
            <h1>Anywhere in your app!</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>

          <JobList jobs={jobs?.data?.jobs || []} />
        </Content>
      </Pushlayout>
    </div>
  );
};

export default Index;
