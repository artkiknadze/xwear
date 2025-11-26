import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 min-h-[calc(100vh-362px)] ${
        props.className ? props.className : ""
      }`}>
      {props.children}
    </div>
  );
}

