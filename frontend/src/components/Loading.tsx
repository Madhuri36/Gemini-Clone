// components/LoadingMessage.tsx

const Loading = () => {
  return (
    <div className="flex px-4 py-1 justify-start">
      <div
        className="max-w-full sm:max-w-[80%] w-fit px-4 py-2 rounded-2xl rounded-tl-sm bg-[var(--custom-bg-two)] text-[var(--text-primary)]"
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
