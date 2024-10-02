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
      <div className="py-10 text-center text-2xl">Aircraft shop</div>
      <div>
        <form className="p-3">
          <label htmlFor="search_input">Search:</label>
          <input
            type="text"
            id="search_input"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className="ml-3 border-2 border-solid border-blue-100"
          />
        </form>
      </div>
      <div>
        <iframe
          className="h-64"
          title="products"
          id="products"
          src={import.meta.env.VITE_CHILD_MF}
          ref={ref}
        ></iframe>
      </div>
    </>
  )
}

export default App
