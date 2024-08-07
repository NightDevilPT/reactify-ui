import * as React from 'react';
import { useState } from 'react';
import styles from '../../styles/Button/Button.module.scss';

type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type SpinnerPlacement = 'start' | 'end';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  spinner?: React.ReactNode;
  spinnerPlacement?: SpinnerPlacement;
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  radius = 'none',
  startContent,
  endContent,
  spinner,
  spinnerPlacement = 'start',
  fullWidth = false,
  isIconOnly = false,
  isDisabled = false,
  isLoading = false,
  disableRipple = false,
  disableAnimation = false,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<JSX.Element[]>([]);

  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const newRipple = (
      <span
        key={Date.now()}
        className={styles.ripple}
        style={{
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
        }}
      />
    );

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // Remove the ripple after the animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 600); // Matches the animation duration
  };

  const buttonClass = `
    ${styles.button}
    ${styles[variant] || ''}
    ${styles[color] || ''}
    ${styles[size] || ''}
    ${styles[`radius-${radius}`] || ''}
    ${fullWidth ? styles['full-width'] : ''}
    ${isIconOnly ? styles['icon-only'] : ''}
    ${isDisabled ? styles['disabled'] : ''}
    ${isLoading ? styles['loading'] : ''}
    ${disableRipple ? styles['no-ripple'] : ''}
    ${disableAnimation ? styles['no-animation'] : ''}
  `;

  return (
    <button
      className={buttonClass.trim()}
      disabled={isDisabled || isLoading}
      onClick={(event) => {
        if (!disableRipple) {
          handleRipple(event);
        }
        if (onClick) {
          onClick(event);
        }
      }}
      {...props}
    >
      {isLoading && spinnerPlacement === 'start' && spinner}
      {startContent && !isLoading && <span className={styles['start-content']}>{startContent}</span>}
      {!isIconOnly && <span className={styles.children}>{children}</span>}
      {endContent && !isLoading && <span className={styles['end-content']}>{endContent}</span>}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {!disableRipple && ripples}
    </button>
  );
};

export default Button;
