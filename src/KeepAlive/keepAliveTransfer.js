import { useRef, useContext, useEffect } from "react";
import { KeepAliveContext } from "./KeepAliveContext";

function keepAliveTransfer(KeepAliveComponent, keepAliveId) {
  return function (props) {
    const _ref = useRef(null);
    const { keepAliveStates, setKeepAliveState } = useContext(KeepAliveContext);

    useEffect(() => {
      const state = keepAliveStates[keepAliveId];
      // 有缓存 使用真实节点nodes，append即可
      if (state && state.nodes) {
        state.nodes.forEach((node) => _ref.current.appendChild(node));
      } else {
        // 无缓存 设置缓存
        setKeepAliveState({
          reactElement: <KeepAliveComponent {...props} />,
          keepAliveId,
        });
      }
    }, [keepAliveStates, setKeepAliveState, props]);

    return <div ref={_ref} className="keepAliveTransfer"></div>;
  };
}

export default keepAliveTransfer;
