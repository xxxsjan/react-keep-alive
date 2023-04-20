import { useCallback, useReducer } from "react";
import keepAliveReducer from "./keepAliveReducer";
import { KeepAliveContext } from "./KeepAliveContext";
import * as actionTypes from "./actionTypes";

function KeepAlive(props) {
  /**
   * {
   *   home: {
   *     keepAliveId: 'home',
   *     reactElement: reactElement
   *     nodes: nodes,
   *     status: create | created
   *   },
   *   form: {
   *     keepAliveId: 'form',
   *     reactElement: reactElement
   *     nodes: nodes,
   *     status: create | created
   *   }
   * }
   *
   */
  const [keepAliveStates, dispatch] = useReducer(keepAliveReducer, {});

  const setKeepAliveState = useCallback(
    ({ reactElement, keepAliveId }) => {
      if (!keepAliveStates[keepAliveId]) {
        dispatch({
          type: actionTypes.CREATING,
          payload: {
            keepAliveId,
            reactElement,
          },
        });
      }
    },
    [keepAliveStates]
  );
  return (
    <KeepAliveContext.Provider
      value={{
        keepAliveStates,
        setKeepAliveState,
        dispatch,
      }}
    >
      {props.children}
      {Object.values(keepAliveStates).map(({ keepAliveId, reactElement }) => (
        <div
          key={keepAliveId}
          ref={(node) => {
            if (node && !keepAliveStates[keepAliveId].nodes) {
              console.log(node, node.childNodes);
              dispatch({
                type: actionTypes.CREATED,
                payload: {
                  keepAliveId,
                  nodes: [...node.childNodes],
                },
              });
            }
          }}
          className="keep-alive"
        >
          {reactElement}
        </div>
      ))}
    </KeepAliveContext.Provider>
  );
}

export default KeepAlive;
