import scrollTo from 'gatsby-plugin-smoothscroll';
import React, { useEffect, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { media } from '~/styles';

export type Positions = {
  current: number;
  about: number;
  skill: number;
  contact: number;
};

interface Props {
  position: Positions;
}

const Nav: React.FC<Props> = ({ position }: Props) => {
  const [windowHeight, setWindowHeight] = useState(0);

  const calcNavLength = (
    current: number,
    target: number,
    isBottom: boolean
  ): number => {
    const diff = isBottom
      ? target - current
      : current - target + windowHeight / 4;

    if (0 <= diff && diff <= windowHeight / 4) {
      return diff / (windowHeight / 4);
    }
    return windowHeight / 4 < diff ? 1 : 0;
  };

  const onResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useMount(() => {
    onResize();
    document.addEventListener('resize', onResize);
  });

  useUnmount(() => {
    document.removeEventListener('resize', onResize);
  });

  return (
    <>
      <Wrapper position={Math.floor(windowHeight / 8)}>
        <Scale
          onClick={e => {
            scrollTo('#top');
          }}
          lengthRate={calcNavLength(
            position.current + windowHeight / 2,
            position.about,
            true
          )}
        >
          Top
        </Scale>
        <Scale
          onClick={e => {
            scrollTo('#about');
          }}
          lengthRate={Math.min(
            calcNavLength(
              position.current + windowHeight / 2,
              position.about,
              false
            ),
            calcNavLength(
              position.current + windowHeight / 2,
              position.skill,
              true
            )
          )}
        >
          About
        </Scale>
        <Scale
          onClick={e => {
            scrollTo('#skill');
          }}
          lengthRate={Math.min(
            calcNavLength(
              position.current + windowHeight / 2,
              position.skill,
              false
            ),
            calcNavLength(
              position.current + windowHeight / 2,
              position.contact,
              true
            )
          )}
        >
          Skill
        </Scale>
        <Scale
          onClick={e => {
            scrollTo('#contact');
          }}
          lengthRate={calcNavLength(
            position.current + windowHeight / 2,
            position.contact,
            false
          )}
        >
          Contact
        </Scale>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ position: number }>`
  ${tw`fixed text-right pr-8 z-10 flex flex-col justify-center items-end right-0`}

  ${({ position }) =>
    css`
      transform: translateY(${position}px);

      ${media.sm`
        ${tw`pr-4`}

        transform: translateY(${position}px);
      `}
    `}
`;

const Scale = styled.div<{ lengthRate: number }>`
  ${tw`text-right align-middle cursor-pointer inline-block`}

  &::after {
    ${tw`bg-gray-900 text-gray-900 inline-block mb-1 ml-2`}

    content: '';
    height: 2px;

    ${({ lengthRate }) =>
      css`
        width: ${lengthRate * 70 + 50}px;
      `}
  }
`;

export default Nav;
