import React from 'react';

const Loader = () => {
  const styles = {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative' as const,
    },
    h3: {
      color: 'white',
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    ring: {
      width: '190px',
      height: '190px',
      border: '1px solid transparent',
      borderRadius: '50%',
      position: 'absolute' as const,
    },
    ring1: {
      borderBottom: '8px solid rgb(255, 141, 249)',
      animation: 'rotate1 2s linear infinite',
    },
    ring2: {
      borderBottom: '8px solid rgb(255, 65, 106)',
      animation: 'rotate2 2s linear infinite',
    },
    ring3: {
      borderBottom: '8px solid rgb(0, 255, 255)',
      animation: 'rotate3 2s linear infinite',
    },
    ring4: {
      borderBottom: '8px solid rgb(252, 183, 55)',
      animation: 'rotate4 2s linear infinite',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ ...styles.ring, ...styles.ring1 }}></div>
        <div style={{ ...styles.ring, ...styles.ring2 }}></div>
        <div style={{ ...styles.ring, ...styles.ring3 }}></div>
        <div style={{ ...styles.ring, ...styles.ring4 }}></div>
        <div style={styles.h3}>loading</div>
      </div>
      <style>
        {`
          @keyframes rotate1 {
            from {
              transform: rotateX(50deg) rotateZ(110deg);
            }
            to {
              transform: rotateX(50deg) rotateZ(470deg);
            }
          }
          @keyframes rotate2 {
            from {
              transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
            }
            to {
              transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
            }
          }
          @keyframes rotate3 {
            from {
              transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
            }
            to {
              transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
            }
          }
          @keyframes rotate4 {
            from {
              transform: rotateX(70deg) rotateZ(270deg);
            }
            to {
              transform: rotateX(70deg) rotateZ(630deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;