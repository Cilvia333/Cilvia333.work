import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import SEO from '~/components/seo';

type Form = {
  name: string;
  email: string;
  message: string;
};

const ContactsPage: React.FC = () => {
  const [formState, setFormState] = useState<Form>({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    message: false,
  });

  const onSubmit = e => {
    if (formState.name === '') {
      setError({ ...error, name: true });
    } else if (formState.email === '') {
      setError({ ...error, email: true });
    } else if (formState.message === '') {
      setError({ ...error, message: true });
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <SEO title="CONTACTS" />
      <Wrapper>
        <Contacts>
          <Header>
            <h2>ご依頼を受け付けています</h2>
            <p>
              webデザインやウェブフロントエンド開発(CMSなど)、DTPデザインなど、制作のご依頼は下記のメールアドレスまたは、コンタクトフォームからご連絡ください。
              作品の感想もお待ちしております！
            </p>
          </Header>
          <Email>
            E-MAIL:
            <a href="mailto:cilvia333x@gmail.com">cilvia333x@gmail.com</a>
          </Email>
          <FormWrapper>
            <h3>CONTACT FORM:</h3>
            <Form
              name="contact"
              method="post"
              data-netlify="true"
              onSubmit={onSubmit}
            >
              <noscript>
                <p>This form won’t work with Javascript disabled.</p>
              </noscript>
              <Input>
                <h4>
                  お名前・会社<Required>*</Required>
                </h4>
                <InputText
                  type="text"
                  required
                  name="name"
                  placeholder="your name & company"
                  onChange={e => {
                    setFormState({ ...formState, name: e.target.value });
                    setError({ ...error, name: false });
                  }}
                />
              </Input>
              <Input>
                <h4>
                  メールアドレス<Required>*</Required>
                </h4>
                <InputText
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  onChange={e => {
                    setFormState({ ...formState, email: e.target.value });
                    setError({ ...error, email: false });
                  }}
                />
              </Input>
              <Input>
                <h4>
                  メッセージ<Required>*</Required>
                </h4>
                <TextArea
                  name="message"
                  required
                  placeholder="message here"
                  onChange={e => {
                    setFormState({ ...formState, message: e.target.value });
                    setError({ ...error, message: false });
                  }}
                />
              </Input>
              <Button type="submit">送信！</Button>
            </Form>
          </FormWrapper>
        </Contacts>
        <AttentionWrapper>
          <Attention>
            <h3>ご依頼の流れ</h3>
            <ol>
              <AttentionItem>
                <h4>① ご依頼・ご相談</h4>
                <p>
                  納期、予算を明記のうえ、メールもしくはコンタクトフォームよりご連絡ください。
                </p>
              </AttentionItem>
              <AttentionItem>
                <h4>② 見積もり</h4>
                <p>
                  いただいた内容やヒヤリングを通して、作業内容とスケジュールを見積もりします。
                </p>
              </AttentionItem>
              <AttentionItem>
                <h4>③ 着手</h4>
                <p>
                  お見積もりに問題がなければ、受注となります。スケジュールに従って、作業をしていきます。
                </p>
              </AttentionItem>
            </ol>
          </Attention>
          <Attention>
            <h3>ご相談いただけること</h3>
            <ul>
              <AttentionItem>
                <h4>ウェブサイト作成</h4>
                <ul>
                  <li>デザイン〜アニメーション〜実装</li>
                  <li>デザインのみ</li>
                  <li>既存デザインに合わせたフロントエンド開発</li>
                </ul>
              </AttentionItem>
              <AttentionItem>
                <h4>書籍・同人誌のデザイン</h4>
                <ul>
                  <li>表紙などの装丁デザイン</li>
                  <li>本文のエディトリアルデザイン</li>
                </ul>
              </AttentionItem>
              <AttentionItem>
                <h4>そのほか</h4>
                <ul>
                  <li>ロゴデザイン</li>
                  <li>電子回路ふくめたハードウェア制作</li>
                </ul>
              </AttentionItem>
            </ul>
          </Attention>
        </AttentionWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`w-full pt-32 px-16 grid gap-16 m-auto`}

  max-width: 1024px;

  grid-template-columns: minmax(0, 1.414fr) minmax(0, 1fr);
`;

const Contacts = styled.section`
  ${tw`col-start-1 col-end-2`}
`;

const Header = styled.div`
  ${tw`text-gray-900 mb-12`}

  h2 {
    ${tw`font-header font-bold text-3xl mb-2`}
  }

  p {
    ${tw`font-text text-sm mb-2`}
    line-height: 35px;
  }
`;

const Email = styled.div`
  ${tw`relative w-full col-start-1 col-end-2 text-gray-900 font-header font-bold text-2xl mb-6`}

  a {
    ${tw`relative text-primary-500 ml-2 underline`}
  }
`;

const FormWrapper = styled.div`
  ${tw`relative w-full pt-6`}

  &::before {
    ${tw`absolute w-full m-0 top-0 left-0 bg-gray-900 rounded-full`}

    content: "";
    height: 4px;
  }

  h3 {
    ${tw`text-gray-900 font-header font-bold text-2xl mb-4`}
  }
`;

const Form = styled.form`
  ${tw`w-full text-center`}
`;

const Input = styled.div`
  ${tw`mb-4`}

  h4 {
    ${tw`text-gray-900 font-header font-medium text-base text-left`}
  }
`;

const Required = styled.span`
  ${tw`text-red-600 ml-1`}
`;

const InputText = styled.input`
  ${tw`w-full rounded-full text-gray-900 font-text text-sm border-transparent focus:border-primary-500 border-solid border outline-none py-2`}
  text-indent: 1em;
`;

const TextArea = styled.textarea`
  ${tw`w-full h-64 text-gray-900 font-text text-sm border-transparent focus:border-primary-500 border-solid border outline-none resize-none px-3 py-2`}
  border-radius: 1rem;
`;

const Button = styled.button`
  ${tw`bg-primary-500 text-gray-900 font-header font-bold rounded-full w-full py-2 text-center m-auto`}
  max-width: 256px;
`;

const AttentionWrapper = styled.section`
  ${tw`w-full h-full col-start-2 col-end-3 bg-white px-4 py-6`}

  border-radius: 1rem;
`;

const Attention = styled.div`
  ${tw`w-full text-gray-900 font-text text-sm mb-4`}

  h3 {
    ${tw`relative font-header font-bold text-xl`}

    &::before {
      ${tw`absolute w-full m-0 bottom-0 left-0 bg-primary-500 rounded-full`}

      content: "";
      height: 2px;
    }
  }

  & > ul,
  & > ol {
    ${tw`mt-4`}
  }
`;

const AttentionItem = styled.li`
  ${tw`text-gray-900 text-sm mb-2`}

  h4 {
    ${tw`font-bold font-header`}
  }

  ul {
    ${tw`list-disc list-inside ml-2`}
  }
`;

export default ContactsPage;
