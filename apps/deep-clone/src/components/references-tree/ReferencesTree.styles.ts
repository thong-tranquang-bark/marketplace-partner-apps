import { css } from '@emotion/css';

export const treeContainerStyles = css`
  height: auto;
  overflow-y: auto;
  width: 1000px;
  box-sizing: border-box;

  /* Responsive: use full width on smaller screens */
  @media (max-width: 1200px) {
    width: 1000px;
  }
  @media (max-width: 1000px) {
    width: 800px;
  }
`;

export const treeNodeStyles = css`
  position: relative;
  margin-bottom: 8px;
  width: 100%;
  max-width: 100%;

  .tree-node-item {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 8px 12px;
    background-color: #ffffff;
    position: relative;
    margin-left: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 0;

    &:hover {
      border-color: #b0b0b0;
      background-color: #f9f9f9;
    }

    .tree-node-item-checkbox {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      flex: 1 1 auto;
      margin-top: 5px;
      margin-bottom: 5px;

      > * {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
      }
    }
  }

  .tree-node-children {
    position: relative;
    margin-top: 8px;
    width: calc(100% - 24px);
    max-width: calc(100% - 24px);
    box-sizing: border-box;
  }

  &:first-child .tree-node-item::after {
    display: none;
  }

  &.is-last-child .tree-node-item::after {
    height: 50%;
  }

  &.is-last-child .tree-node-children::before {
    display: none;
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .tree-node-item {
      padding: 6px 8px;
    }

    .tree-node-children {
      margin-left: 16px;
      padding-left: 12px;
      width: calc(100% - 16px);
      max-width: calc(100% - 16px);
    }
  }

  @media (max-width: 480px) {
    .tree-node-item {
      padding: 4px 6px;
    }

    .tree-node-children {
      margin-left: 12px;
      padding-left: 8px;
      width: calc(100% - 12px);
      max-width: calc(100% - 12px);
    }
  }
`;

export const treeNodeWrapper = css`
  position: relative;
`;

export const treeNodeSpacer = css`
  width: 30px;
  flex-shrink: 0;
`;

export const treeNodeIconButton = css`
  margin-right: 1px;
  width: 5px;
  height: 5px;
  flex-shrink: 0;
`;

export const treeNodeInnerFlex = css`
  min-width: 0;
  width: 100%;
`;

export const treeNodeIcon = css`
  flex-shrink: 0;
`;

export const treeNodeText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const treeTitleText = css`
  margin-top: 20px;
`;

export const treeLoadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const containerButtons = css`
  float: right;
  margin: 0 16px 16px 0;
  display: inline-block;
`;
