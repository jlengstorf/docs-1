import { getAllPosts, getPostBySlug } from '../../lib/post'
import MDXContent from '../../components/MDX.Content'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags'
import { ContentBlock, PageContainer } from '../../components/Layout.Wrapper'
import Header from '../../components/Header'
import QuickNav from '../../components/QuickNav'
import Footer from '../../components/Footer'
import Layout from '../../components/layout'
import { serialize } from 'next-mdx-remote/serialize'

export default function Post({ frontmatter, headings, body, fields }) {
  return (
    <Layout>
      <TitleAndMetaTags
        title={frontmatter.title}
        description={frontmatter.subtitle ? frontmatter.subtitle : ''}
        banner={
          frontmatter.banner
            ? frontmatter.banner
            : '/img/internals/social_share.png'
        }
        pathname={`${fields.slug}`}
      />
      <PageContainer>
        <Header />
        <ContentBlock>
          <MDXContent
            title={frontmatter.title}
            subtitle={frontmatter.subtitle ? frontmatter.subtitle : ''}
            banner={frontmatter.banner ? frontmatter.banner : ''}
            body={body}
            lastUpdatedOn={fields.lastUpdatedOn}
            slug={fields.slug}
          ></MDXContent>
          <QuickNav subNavPages={headings}></QuickNav>
        </ContentBlock>
        <Footer />
      </PageContainer>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.category, params.post)
  const mdxSource = await serialize(post.content)

  return {
    props: {
      frontmatter: post.frontmatter,
      headings: post.headings,
      body: mdxSource,
      fields: {
        slug: post.slug,
        lastUpdatedOn: post.lastUpdatedOn,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          category: post.split('/')[0],
          post: post.split('/')[1].replace(/\.mdx$/, ''),
        },
      }
    }),
    fallback: false,
  }
}
