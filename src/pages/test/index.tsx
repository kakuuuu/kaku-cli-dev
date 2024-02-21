import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';

const memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps ? !depArray.every((el, i) => el === deps[i]) : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('fan');
  useEffect(() => {
    console.log(count);
  }, [count]);
  useEffect(() => {
    console.log(username);
  }, [username]);
  return (
    <div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <div className="code">{count}</div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="cod-btn"
        >
          点击
        </button>
        <div className="code">{username}</div>
        <button
          onClick={() => {
            setUsername(username + ' hello');
          }}
          className="cod-btn"
        >
          点击
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
function render() {
  cursor = 0;
  root.render(<App></App>);
}
render();
