'use client';
// New file for Arrow3D styles and icons
import React from 'react';

export function ArrowLeft() {
  return (
    <>
      <span className='arrow-3d arrow-left group-hover:animate-arrow3d' />
      <style jsx>{`
        .arrow-3d {
          display: inline-block;
          width: 24px;
          height: 24px;
          perspective: 40px;
        }
        .arrow-left {
          position: relative;
          width: 24px;
          height: 24px;
        }
        .arrow-left::before {
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
          border-width: 8px 12px 8px 0;
          border-color: transparent #6366f1 transparent transparent;
          left: 0;
          box-shadow: 2px 2px 8px #6366f1a0;
        }
        .animate-arrow3d {
          animation: arrow3dMove 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes arrow3dMove {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(30deg) scale(1.2); }
          100% { transform: rotateY(0deg) scale(1); }
        }
      `}</style>
    </>
  );
}

export function ArrowRight() {
  return (
    <>
      <span className='arrow-3d arrow-right group-hover:animate-arrow3d' />
      <style jsx>{`
        .arrow-3d {
          display: inline-block;
          width: 24px;
          height: 24px;
          perspective: 40px;
        }
        .arrow-right {
          position: relative;
          width: 24px;
          height: 24px;
        }
        .arrow-right::before {
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
          border-width: 8px 0 8px 12px;
          border-color: transparent transparent transparent #6366f1;
          right: 0;
          box-shadow: -2px 2px 8px #6366f1a0;
        }
        .animate-arrow3d {
          animation: arrow3dMove 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes arrow3dMove {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(30deg) scale(1.2); }
          100% { transform: rotateY(0deg) scale(1); }
        }
      `}</style>
    </>
  );
}