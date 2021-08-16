import React from "react";

//import * as Audiorecorder from './Audiorecorder';
import axios from "axios";
import Audiorecorder from "./Audiorecorder";
import { withStyles } from "@material-ui/styles";
//import Button from "react";
//import Alert from "react";

//import lookingForServiceIcon from "../../assets/images/lookingForService.svg";
//import Header from "../common/Header";
import Footer from "../common/Footer";
import { useStyles } from "./styles";
import { Fragment, useState } from "react";
const FileTypes = { COUGH: "COUGH", BREATH: "BREATH", VOWEL: "VOWEL" };
//export const FileTypes = { COUGH: "COUGH", BREATH: "BREATH", VOWEL: "VOWEL" };
//export const invokeCoughService = async () =>
// const endpoint = "http://example-service-a.singularitynet.io:8019/coviddetection";
// const payload = { coughUrl, vowelUrl, breathUrl };
// try {
//   //const response = await axios.post(endpoint, payload);
//  // const form = new FormData();
//   //form.append('Coughfile',Coughfile );
//   form.append('Breathfile',Breathfile );
//   form.append('Vowelfile',Vowelfile);
// } catch (error) {
//   throw new Error(error);
// }

// const handleFilerecorded = (file,FileType) => {
//   //console.log(file);
//   setValues({...values, [fileType]: file});
// };
// const handleVowelfile= file =>{
//   handleFilerecorded(file,FileTypes.VOWEL);
// }

const RFAILanding = ({ classes }) => {
  const [values, setValues] = useState({
    [FileTypes.COUGH]: undefined,
    [FileTypes.BREATH]: undefined,
    [FileTypes.VOWEL]: undefined,
    error: undefined,
  });
  const handleFilerecorded = (file, FileType) => {
    console.log(file);
    console.log(FileType);
    setValues({ ...values, [FileType]: file });
  };
  const handleVowelfile = file => {
    handleFilerecorded(file, FileTypes.VOWEL);
  };
  const handleCoughfile = file => {
    handleFilerecorded(file, FileTypes.COUGH);
  };
  const handleBreathfile = file => {
    handleFilerecorded(file, FileTypes.BREATH);
  };

  const invokeCoughService = async () => {
    let error = null;
    const payload = new FormData();
    payload.append("coughFile", values[FileTypes.COUGH]);
    payload.append("breathFile", values[FileTypes.BREATH]);
    payload.append("vowelFile", values[FileTypes.VOWEL]);
    const endpoint = "http://example-service-a.singularitynet.io:8019/coviddetection";
    setValues({ ...values, error: "" });
    try {
      const response = await axios.post(endpoint, payload);
    } catch (error) {
      error = error.toString();
    }
    //console.log(error);
    //error();
    setValues({ ...values, error });
  };

  return (
    <Fragment>
      <div className={classes.disabledPortalMainContainer}>
        <div className={classes.disabledPortalMainWrapper}>
          <div className={classes.letterMainContainer}>
            <span>Cough-Service</span>
            <div className={classes.letterContainer}>
              {JSON.stringify(values)}
              <div className={classes.letterBody}>
                <Audiorecorder onFilerecorder={handleVowelfile} title="Vowel Sound" />

                <Audiorecorder onFilerecorder={handleBreathfile} title="Breath Sound" />
                <Audiorecorder onFilerecorder={handleCoughfile} title="Cough Sound" />
                {<button onClick={invokeCoughService}>Invoke</button>}
                <p>{values.error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default withStyles(useStyles)(RFAILanding);
