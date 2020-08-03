import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Chart from "react-google-charts";
import { Radio, Typography, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { options } from './options';


const mapStateToProps = (state: any) => {
  return {
    report: state.transactions || {}
  }
}

const FlowChart = (props: any) => {
  const { report } = props;
  const [lng, setLng] = useState('en');
  const { t, i18n } = useTranslation();
  const data = [["From", "To", "Amount"]];
  const reportModified: any = {};
  Object.keys(report).map((key: string) => {
    reportModified[key] = [t(report[key][0]), t(report[key][1]), report[key][2]];
    return data.push(reportModified[key]);
  })

  const handleChange = (value: string) => {
    setLng(value);
    i18n.changeLanguage(value);
  };



  return (
    <Box className="Chart w-6/12 h-full flex flex-col items-center justify-center">
      <FormControl
        component="fieldset"
        className="mt-5 mb-10"
      >
        <FormLabel component="legend">{t("Select Language")}</FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender1"
          value={lng}
          onChange={(e) => handleChange(e.target.value)}
        >
          <FormControlLabel
            value="en"
            control={<Radio />}
            label="English"
          />
          <FormControlLabel
            value="hin"
            control={<Radio />}
            label="Hindi"
          />
        </RadioGroup>
      </FormControl>
      <Typography variant="h5" component="div" className="w-full text-center">
        {t('Income Expense Diagram')}
      </Typography>
      <Chart
        width="80%"
        height="80%"
        className="m-auto mt-10"
        chartType="Sankey"
        data={data}
        options={options}
      />
    </Box >
  );
}

export default connect(mapStateToProps)(FlowChart);