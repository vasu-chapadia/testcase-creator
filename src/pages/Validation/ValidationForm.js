import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { Form } from "../../components/useForm";
import * as employeeService from "../../services/testService";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

const initialFValues = {
  id: 0,
  VariableName: "",
  ValidationCriteria: "",
  Operations: "",
};

export default function ValidationForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const [formValues, setFormValues] = useState([initialFValues]);
  const resetForm = () => {
    setFormValues([initialFValues]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(formValues, resetForm);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setFormValues([
        {
          ...recordForEdit,
        },
      ]);
  }, [recordForEdit]);

  const handleInputChange = (i, e) => {
    let newFormValues = [...formValues];
    console.log("e.target.value::", e.target.value);
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        id: formValues.length - 1,
        VariableName: "",
        ValidationCriteria: "",
        Operations: "",
      },
    ]);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {formValues.map((ele, index) => (
          <>
            <Grid item xs={3} key={index}>
              <Controls.Input
                name="VariableName"
                label="VariableName"
                value={ele.VariableName}
                onChange={(e) => handleInputChange(index, e)}
              />
            </Grid>
            <Grid item xs={3} key={index}>
              <Controls.Select
                name="Operations"
                label="Operations"
                value={ele.Operations}
                onChange={(e) => handleInputChange(index, e)}
                options={employeeService.getOperationsCollection()}
              />
            </Grid>
            <Grid item xs={3} key={index}>
              <Controls.Input
                name="ValidationCriteria"
                label="Validation Criteria"
                value={ele.ValidationCriteria}
                onChange={(e) => handleInputChange(index, e)}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{ display: "flex", alignItems: "center" }}
              key={index}
            >
              {index && recordForEdit == null ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => removeFormFields(index)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
              {recordForEdit == null && (
                <IconButton aria-label="add" onClick={() => addFormFields()}>
                  <AddIcon />
                </IconButton>
              )}
            </Grid>
          </>
        ))}
      </Grid>
      {recordForEdit != null ? (
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Controls.Button
              type="submit"
              text="Update Filter"
              endIcon={<Icon>send</Icon>}
            />
          </div>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Controls.Button
              type="submit"
              text="Apply Filter"
              endIcon={<Icon>send</Icon>}
            />
          </div>
        </Grid>
      )}
    </Form>
  );
}
