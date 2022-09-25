
import { ComponentMetadata, Snippet } from '@alilc/lowcode-types';

const PortalCardMeta: ComponentMetadata = {
  "componentName": "PortalCard",
  "title": "PortalCard",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "group":"精选组件",
  "category":"Potal",
  "npm": {
    "package": "mo-lowcode-demo",
    "version": "0.1.0",
    "exportName": "PortalCard",
    "main": "src/index.tsx",
    "destructuring": true,
    "subName": ""
  },
  "configure": {
    "props": [
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "title",
            "zh-CN": "title"
          }
        },
        "name": "title",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": false,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "description",
            "zh-CN": "description"
          }
        },
        "name": "description",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": false,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "backgroundImage",
            "zh-CN": "backgroundImage"
          }
        },
        "name": "backgroundImage",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": false,
          "initialValue": ""
        }
      }
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};

const snippets: Snippet[] = [
  {
    "title": "PortalCard",
    "screenshot": "https://img20.360buyimg.com/ceco/s300x300_jfs/t1/101755/34/14186/56519/5e6327b3E4037f672/9288c2b7c5c81b2a.jpg!q70.jpg",
    "schema": {
      "componentName": "PortalCard",
      "props": {}
    }
  }
];

export default {
  ...PortalCardMeta,
  snippets
};
