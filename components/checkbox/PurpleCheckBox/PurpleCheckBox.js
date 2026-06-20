const PurpleCheckBox = ({ checked, disabled, id }) => {
  return (
    <input
      id={id}
      disabled={disabled}
      type="checkbox"
      className={disabled ? "disabledCheckBox" : "checkBox"}
      checked={checked}
    />
  );
};

export default PurpleCheckBox;
