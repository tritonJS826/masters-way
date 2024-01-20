 type ProgressBarProps = {/**
                           * ProgressBar prop type
                           */
   progress: Array<boolean>;}

/**
 * ProgressBar component
 */
export const ProgressBar = (arg: ProgressBarProps) => {
  const PERCENT = 100;
  const computedProcent = PERCENT / arg.progress.length;
  const countTrue = arg.progress.filter((item) => item);

  return (
    <>
      <div>
        {countTrue.length * computedProcent}
      </div>
      <div style={{backgroundColor: "#ddd", height: 20}}>
        <div style={{
          width: `${countTrue.length * computedProcent}%`,
          height: "100%",
          backgroundColor: "#0070f3",
        }}
        />
      </div>

    </>

  );
};

