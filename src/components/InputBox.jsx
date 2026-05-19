function InputBox({ input, setInput, sendMessage }) {
  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default InputBox;