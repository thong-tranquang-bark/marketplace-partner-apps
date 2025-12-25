import { Checkbox, Text, Box, Flex, IconButton, Tooltip } from '@contentful/f36-components';
import { AssetIcon, ChevronRightIcon, ChevronDownIcon } from '@contentful/f36-icons';
import { TreeNode } from './ReferencesTree.types';
import {
  treeNodeStyles,
  treeNodeWrapper,
  treeNodeSpacer,
  treeNodeIconButton,
  treeNodeInnerFlex,
  treeNodeIcon,
  treeNodeText,
} from './ReferencesTree.styles';

interface TreeNodeComponentProps {
  node: TreeNode;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggle: (_path: string, _entryId: string) => void;
  onToggleExpand: (_entryId: string) => void;
  level?: number;
  isLast?: boolean;
  path?: string;
  disabledPaths: Set<string>;
}

export function TreeNodeComponent({
  node,
  selectedIds,
  expandedIds,
  onToggle,
  onToggleExpand,
  level = 0,
  isLast = false,
  path = '',
  disabledPaths,
}: TreeNodeComponentProps) {
  // Use path-based key to uniquely identify this node instance
  const nodePath = path ? `${path}:${node.entryId}` : node.entryId;
  const isSelected = selectedIds.has(nodePath);
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.entryId);
  const isDisabled = disabledPaths.has(nodePath) || !!node.isMorePlaceholder;

  // Special rendering for "+more" placeholder
  if (node.isMorePlaceholder) {
    return (
      <Flex alignItems="flex-start" gap="spacing2Xs">
        <Box className={treeNodeSpacer} />
        <Box className={`${treeNodeStyles} ${treeNodeWrapper} ${isLast ? 'is-last-child' : ''}`}>
          <Box className="tree-node-item">
            <Tooltip content="There are more child components. Open parent entry to see them." >
              <Text fontWeight="fontWeightDemiBold" fontColor="gray600">
                {node.displayName}
              </Text>
            </Tooltip>
          </Box>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex alignItems="flex-start" gap="spacing2Xs">
      {hasChildren ? (
        <IconButton
          variant="transparent"
          size="small"
          icon={isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => onToggleExpand(node.entryId)}
          className={treeNodeIconButton}
          style={{ marginTop: '5px' }}
        />
      ) : (
        <Box className={treeNodeSpacer} />
      )}
      <Box className={`${treeNodeStyles} ${treeNodeWrapper} ${isLast ? 'is-last-child' : ''}`}>
        <Box className="tree-node-item">
          <Checkbox
            className="tree-node-item-checkbox"
            isChecked={isSelected}
            isDisabled={isDisabled}
            onChange={() => onToggle(nodePath, node.entryId)}
            id={`checkbox-${nodePath}`}
          >
            <Flex alignItems="center" gap="spacing2Xs" className={treeNodeInnerFlex}>
              {node.isAsset && (
                <AssetIcon variant="muted" size="small" className={treeNodeIcon} />
              )}
              <Text fontWeight="fontWeightDemiBold" className={treeNodeText}>
                {node.displayName}
              </Text>
              {node.internalName && (
                <Text fontWeight="fontWeightNormal" fontColor="gray600" className={treeNodeText}>
                  ({node.internalName})
                </Text>
              )}
            </Flex>
          </Checkbox>
        </Box>
        {hasChildren && isExpanded && (
          <Box className="tree-node-children">
            {node.children.map((child, index) => (
              <TreeNodeComponent
                key={`${nodePath}:${child.entryId}`}
                node={child}
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                onToggle={onToggle}
                onToggleExpand={onToggleExpand}
                level={level + 1}
                isLast={index === node.children.length - 1}
                path={nodePath}
                disabledPaths={disabledPaths}
              />
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  );
}

