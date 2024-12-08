function StepCard({ number, title }) {
    return (
      <div className="step-card">
        <div className="step-number">{number}</div>
        <h3 className="step-title">{title}</h3>
      </div>
    );
  }


export default StepCard