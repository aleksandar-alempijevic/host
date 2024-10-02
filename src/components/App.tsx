import { useEffect, useRef, useState } from 'react'

function App() {
  const [currentText, setCurrentText] = useState<string>('')
  const ref = useRef<HTMLIFrameElement>(null)

  function sendMessage(messageText: string) {
    if (!ref.current) {
      return
    }

    ref?.current?.contentWindow?.postMessage(
      { type: 'msg', message: messageText },
      '*'
    )
  }

  useEffect(() => {
    sendMessage(currentText)
  }, [currentText])

  return (
    <>
      <div className="py-10 text-center text-2xl">HOST APPLICATION</div>
      <div>
        <iframe
          title="child microfrontend"
          id="childmf"
          src={import.meta.env.VITE_CHILD_MF}
          ref={ref}
        ></iframe>
      </div>
      <div>
        <form className="p-3">
          <label htmlFor="some_input">Enter text:</label>
          <input
            type="text"
            id="some_input"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className="ml-3 border-2 border-solid border-blue-100"
          />
        </form>
      </div>
    </>
  )
}

export default App
