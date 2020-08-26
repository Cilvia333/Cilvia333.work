import { graphql } from 'gatsby';
import React, { useContext } from 'react';
import { useEffectOnce } from 'react-use';
import styled from 'styled-components';
import tw from 'twin.macro';

import Pager from '~/components/pager';
import SEO from '~/components/seo';
import WorkCard from '~/components/work-card';

import { layoutContext } from '~/hooks';

import { media } from '~/styles';

import { ContentfulFluid } from '~/types/graphql-types';

export type Work = {
  id?: string;
  slug?: string;
  title?: string;
  tags?: {
    title?: string;
  }[];
  thumbnail?: {
    title?: string;
    fluid?: ContentfulFluid;
  };
};

const TagsPage: React.FC = ({ data, pageContext }: any) => {
  const works: Work[] = data.allContentfulWork.edges.map((edge: any) => {
    return edge.node;
  });

  const ctx = useContext(layoutContext);

  useEffectOnce(() => {
    ctx.setPageTitle('WORKS');
  });

  return (
    <>
      <SEO title="works" />
      <Wrapper>
        <CardWrapper>
          {works?.map((work: Work, index) => {
            return (
              <WorkCard
                thumbnail={work.thumbnail?.fluid}
                title={work.title ?? ''}
                tags={work.tags}
                to={`/works/${work.slug}`}
                key={`work_${index}`}
              />
            );
          })}
        </CardWrapper>
        <Pager pageContext={pageContext} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`relative w-full pt-32`}
`;

const CardWrapper = styled.ul`
  ${tw`w-full m-auto mb-12 px-16 flex justify-between items-center flex-wrap`}

  max-width: 768px;

  ${media.md`
    ${tw`px-8`}
  `}
  ${media.sm`
    ${tw`justify-center`}
    max-width: 512px;
  `}
`;
export const query = graphql`
  query($skip: Int!, $limit: Int!, $tag: String) {
    allContentfulWork(
      sort: { fields: [updatedAt], order: DESC }
      filter: {
        tags: { elemMatch: { title: { eq: $tag } } }
        node_locale: { eq: "ja" }
      }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          slug
          title
          tags {
            title
          }
          thumbnail {
            title
            fluid(maxWidth: 1440) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;

export default TagsPage;
