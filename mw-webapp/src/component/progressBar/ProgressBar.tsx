 type ProgressBarProps = {/**
                           * ProgressBar prop type
                           */
   progress: Array<boolean>;}

/**
 * ProgressBar component
 */
export const ProgressBar = (arg: ProgressBarProps) => {
  const PERCENT = 100;
  const countTrue = arg.progress.filter((item) => item).length;
  const computedProcent = (PERCENT / arg.progress.length) * countTrue;

  return (
    <>
      <div>
        {computedProcent}
      </div>
      <div style={{backgroundColor: "#ddd", height: 20}}>
        <div style={{
          width: `${computedProcent}%`,
          height: "100%",
          backgroundColor: "#0070f3",
        }}
        />
      </div>

    </>

  );
};

