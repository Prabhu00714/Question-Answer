/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, index, selectedIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={index !== selectedIndex}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {index === selectedIndex && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SubTabs() {
  const [mainCategoryValue, setMainCategoryValue] = useState(0);
  const [subCategoryValue, setSubCategoryValue] = useState(0);
  const [mainSelectedOptions, setMainSelectedOptions] = useState({});
  const [subSelectedOptions, setSubSelectedOptions] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data");
        console.log("data", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMainCategoryChange = (event, newValue) => {
    setMainCategoryValue(newValue);
    setSubCategoryValue(0); // Reset subcategory value when changing the main category
  };

  const handleSubCategoryChange = (event, newValue) => {
    setSubCategoryValue(newValue);
  };

  const handleMainOptionSelect = (questionKey, answerIndex) => {
    console.log("main option");
    setMainSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionKey]: answerIndex,
    }));
  };

  const handleSubOptionSelect = (questionKey, answerIndex) => {
    console.log("sub option");
    setSubSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionKey]: answerIndex,
    }));
  };

  if (loading) {
    return (
      <div
        className="my-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={mainCategoryValue}
        onChange={handleMainCategoryChange}
        aria-label="main category tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {data.map((category, index) => (
          <Tab
            key={index}
            label={category.Category}
            {...a11yProps(index)}
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            wrapped
          />
        ))}
      </Tabs>

      {data.map((category, categoryIndex) => (
        <CustomTabPanel
          key={categoryIndex}
          index={categoryIndex}
          selectedIndex={mainCategoryValue}
        >
          {category.SubCategories && category.SubCategories.length > 0 && (
            <Tabs
              value={subCategoryValue}
              onChange={handleSubCategoryChange}
              aria-label="sub-category tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              {category.SubCategories.map((subCategory, subIndex) => (
                <Tab
                  key={subIndex}
                  label={subCategory.SubCategoryName}
                  {...a11yProps(subIndex)}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  wrapped
                />
              ))}
            </Tabs>
          )}

          {category.SubCategories &&
            category.SubCategories.map((subCategory, subIndex) => (
              <CustomTabPanel
                key={subIndex}
                index={subIndex}
                selectedIndex={subCategoryValue}
              >
                {subCategory.Questions &&
                  subCategory.Questions.map((question, questionIndex) => (
                    <>
                      <div key={questionIndex} style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          <Typography
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            {question.QuestionID}. {question.QuestionText}
                          </Typography>
                          &nbsp;
                          {question.Answers &&
                            question.Answers.map((answer, answerIndex) => (
                              <div key={answerIndex}>
                                <label
                                  sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name={`main-${categoryIndex}-${subIndex}-${questionIndex}`}
                                    onChange={() =>
                                      handleMainOptionSelect(
                                        `${categoryIndex}-${subIndex}-${questionIndex}`,
                                        answerIndex
                                      )
                                    }
                                    checked={
                                      mainSelectedOptions[
                                        `${categoryIndex}-${subIndex}-${questionIndex}`
                                      ] === answerIndex
                                    }
                                  />
                                  &nbsp;&nbsp;&nbsp;{answer.Answer}
                                </label>
                              </div>
                            ))}
                        </div>
                        <div>
                          {question.image && (
                            <img
                              width={200}
                              height={200}
                              src={question.image}
                              alt="preview"
                            />
                          )}
                        </div>
                      </div>
                      &nbsp;&nbsp;
                    </>
                  ))}
              </CustomTabPanel>
            ))}
        </CustomTabPanel>
      ))}

      {data.map((item, index) => (
        <CustomTabPanel
          key={index}
          index={index}
          selectedIndex={mainCategoryValue}
        >
          {item.Questions &&
            item.Questions.map((question, questionIndex) => (
              <>
                <div key={questionIndex} style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {question.QuestionID}. {question.QuestionText}
                    </Typography>
                    &nbsp;
                    {question.Answers &&
                      question.Answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                          <label
                            sx={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            <input
                              type="radio"
                              name={`sub-${index}-${questionIndex}`}
                              onChange={() =>
                                handleSubOptionSelect(
                                  `${index}-${questionIndex}`,
                                  answerIndex
                                )
                              }
                              checked={
                                subSelectedOptions[
                                  `${index}-${questionIndex}`
                                ] === answerIndex
                              }
                            />
                            &nbsp;&nbsp;&nbsp;{answer.Answer}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div>
                    {question.image && (
                      <img
                        width={200}
                        height={200}
                        src={question.image}
                        alt="preview"
                      />
                    )}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                &nbsp;&nbsp;
              </>
            ))}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

export default SubTabs;
