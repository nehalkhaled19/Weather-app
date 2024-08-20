import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom'; // لاستخدام Navigate

// التحقق من صحة النموذج باستخدام Yup
const validationSchema = Yup.object({
  cityName: Yup.string()
    .required('City name is required')
    .matches(/^[a-zA-Z]{3,20}[ ]?[a-zA-Z]*$/, "Enter a valid name"),
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };
  }

  // الحصول على سجل البحث من localStorage
  getSearchHistory() {
    return JSON.parse(localStorage.getItem("city")) || [];
  }

  handleSubmit = (values, { resetForm }) => {
    const { cityName } = values;
    const searchHistory = this.getSearchHistory();
    
    // تحقق مما إذا كان اسم المدينة موجودًا بالفعل في سجل البحث
    if (!searchHistory.includes(cityName)) {
      // إضافة اسم المدينة فقط إذا لم يكن موجودًا
      localStorage.setItem('city', JSON.stringify([...searchHistory, cityName]));
    }

    // تعيين الحالة لإعادة التوجيه
    this.setState({
      redirectTo: `/search/${encodeURIComponent(cityName)}`
    });

    // إعادة تعيين النموذج بعد الإرسال
    resetForm();
  };

  render() {
    const searchHistory = this.getSearchHistory();
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }

    return (
      <div className="w-full md:h-lvh pt-20">
        <div className="w-full md:w-4/5 m-auto px-3">
          <Formik
            initialValues={{ cityName: '' }}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          >
            {() => (
              <div>
                <Form className="w-full relative">
                  <Field
                    id="cityName"
                    name="cityName"
                    type="text"
                    className="border-0 md:px-5 px-2 py-4 w-full rounded-3xl"
                    placeholder="Find your location..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-400 text-white rounded-3xl absolute right-1 top-1 bottom-1 px-5 font-semibold text-lg"
                  >
                    Search
                  </button>
                </Form>
                <ErrorMessage name="cityName" component="p" className="mt-2 text-red-600 block text-lg" />
              </div>
            )}
          </Formik>
        </div>

        <table className="m-auto mt-10 rounded bg-gray-100 shadow my-4 w-1/2">
          <thead>
            <tr>
              <th className="border-b p-3 text-lg text-gray-700">History Search</th>
            </tr>
          </thead>
          <tbody>
            {searchHistory.length === 0 ? (
              <tr>
                <td className="border-b p-3">No search history</td>
              </tr>
            ) : (
              searchHistory.map((city, index) => (
                <tr key={index}>
                  <td className="border-b p-3">{city.toUpperCase()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default InputForm;
