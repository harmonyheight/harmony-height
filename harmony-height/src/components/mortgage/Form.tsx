"use client"
import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import FormInputGroup from "./FormInputGroup";
import { GiStealthBomber } from "react-icons/gi";

function Form() {
    const [homeValue, setHomeValue] = useState<number | string>("");
    const [downPayment, setDownPayment] = useState<number | string>("");
    const [loanAmount, setLoanAmount] = useState<number | string>("");
    const [interestRate, setInterestRate] = useState<number | string>("");
    const [loanDuration, setLoanDuration] = useState<number | string>("");
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

    const handleReset = () => {
        setHomeValue("");
        setDownPayment("");
        setLoanAmount("");
        setInterestRate("");
        setLoanDuration("");
        setMonthlyPayment(0);
    }
    function calculateLoanAmount() {
        const calculatedLoanAmount = Number(homeValue) - Number(downPayment);
        setLoanAmount(calculatedLoanAmount || "");
    }

    function calculateMonthlyPayment() {
        // Percentage conversion
        function percentageToDecimal(percent: number) {
            return percent / 12 / 100;
        }

        // years to month conversion
        function yearsToMonths(year: number) {
            return year * 12;
        }

        const calculatedMonthlyPayment =
            (percentageToDecimal(Number(interestRate)) * Number(loanAmount)) /
            (1 -
                Math.pow(
                    1 + percentageToDecimal(Number(interestRate)),
                    -yearsToMonths(Number(loanDuration))
                ));

        setMonthlyPayment(calculatedMonthlyPayment || 0);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col lg:flex-row justify-center items-center lg:items-start">

            <div className="lg:flex lg:space-x-8">
                <div>
                    <FormInputGroup
                        text="Home Value "
                        icon={<FaDollarSign />}
                        placeholder={"Enter the value of the home"}
                        value={homeValue}
                        onInput={(e) => setHomeValue(e.target.value)}
                        onKeyUp={calculateLoanAmount}
                        required={true}
                    />
                    <FormInputGroup
                        text="Down payment"
                        icon={<FaDollarSign />}
                        placeholder={"Enter your funds"}
                        value={downPayment}
                        onInput={(e) => setDownPayment(e.target.value)}
                        onKeyUp={calculateLoanAmount}
                        required={true}
                    />
                    <FormInputGroup
                        text="Loan amount"
                        icon={<FaDollarSign />}
                        placeholder={"Enter your funds"}
                        readOnly={true}
                        value={loanAmount}
                    />

                    <FormInputGroup
                        text="Interest Rate %"
                        placeholder={"Enter your interest rate"}
                        value={interestRate}
                        onInput={(e) => setInterestRate(e.target.value)}
                        required={true}
                    />
                    <FormInputGroup
                        text="Loan Duration (years)"
                        placeholder={"Enter the duration of your loan in years"}
                        value={loanDuration}
                        onInput={(e) => setLoanDuration(e.target.value)}
                        required={true}
                    />
                    <button
                        type="submit"
                        onClick={calculateMonthlyPayment}
                        className="btn btn-primary btn w-full lg:w-auto"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            <div className="lg:flex-col lg:flex justify-start items-start text-center px-4">

                <div className="my-4">
                    <h2 className="text-2xl font-semibold uppercase">Calculations Summary</h2>
                </div>
                <div>

                    <button

                        onClick={handleReset}
                        className="btn btn-secondary"
                    >
                        Reset
                    </button>
                </div>

                <div className="stats shadow my-3">
                    <div className="stats">
                        <div className="stat">
                            <div className="stat-title px-4">Monthly Payment</div>
                        </div>
                    </div>

                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-value text-lg">${parseFloat(monthlyPayment.toFixed(2))}</div>
                        </div>
                    </div>
                </div>
                <div className="stats shadow my-3">
                    <div className="stats">
                        <div className="stat">
                            <div className="stat-title px-6">Interest Rate %</div>
                        </div>
                    </div>

                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-value text-lg">{interestRate ? interestRate : 0}%</div>
                        </div>
                    </div>
                </div>
                <div className="stats shadow my-3">
                    <div className="stats">
                        <div className="stat">
                            <div className="stat-title">Loan Duration (Years)</div>
                        </div>
                    </div>

                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-value text-lg">{loanDuration ? `${loanDuration} years` : 0} </div>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="stat">
                        <div className="stat-title">Down Payment</div>
                        <div className="stat-value text-lg">${loanAmount ? loanAmount : 0}</div>
                    </div>
                    {
                        homeValue && downPayment &&
                        <div className="radial-progress" style={{ "--value": `${parseFloat(((Number(downPayment) / Number(homeValue)) * 100).toFixed(2))}`, "--size": "8rem", "--thickness": "2px" } as React.CSSProperties} role="progressbar">
                            <span className="text-xs font-semibold">{parseFloat(((Number(downPayment) / Number(homeValue)) * 100).toFixed(2))}%</span>
                        </div>
                    }

                </div>

            </div>

        </form>
    );
}

export default Form;
