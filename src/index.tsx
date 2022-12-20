import ReactDOM from 'react-dom/client';
import {useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import { start } from 'repl';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService();
  }, [])
  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    //text we want to transpile
   const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    console.log(result)

  }
  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>;
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App/>
)
