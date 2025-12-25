import { useState } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { DialogAppSDK } from '@contentful/app-sdk';
import { EntryProps } from 'contentful-management';
import { ReferencesTree } from '../components/references-tree/ReferencesTree';
import { Stack, Button, Text } from '@contentful/f36-components';
import { useAutoResizer } from '@contentful/react-apps-toolkit';
import { containerButtons } from '../components/references-tree/ReferencesTree.styles';

function Dialog() {
    const sdk = useSDK<DialogAppSDK>();
    useAutoResizer();
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const invocationParams = (sdk.parameters.invocation || {}) as unknown as {
        referencesTree?: Record<string, EntryProps>;
        parentEntryId?: string;
        listBlockContentIds?: string[];
    };

    const { referencesTree = {}, parentEntryId = '', listBlockContentIds = [] } = invocationParams;

    if (!referencesTree || !parentEntryId) {
        return (
            <Stack spacing="spacingM" flexDirection="column">
                <Text>Error: Missing dialog parameters</Text>
                <Button onClick={() => sdk.close(null)} variant="secondary" isFullWidth>
                    Close
                </Button>
            </Stack>
        );
    }

    const handleClose = () => {
        // Reset state and close dialog (return null to indicate cancellation)
        sdk.close(null);
    };

    const handleClone = () => {
        // Return selectedIds as array to continue with cloning
        sdk.close(Array.from(selectedIds));
    };

    return (
        <Stack spacing="spacingM" flexDirection="column" className="f36-content-width--default"
        >
            <ReferencesTree
                referencesTree={referencesTree}
                parentEntryId={parentEntryId}
                onSelectedIdsChange={setSelectedIds}
                listBlockContentIds={listBlockContentIds}
            />

            <div style={{ width: '100%' }}>
                <div className={containerButtons}>
                    <Button onClick={handleClose} variant="secondary" style={{ marginRight: '16px' }}>
                        Close
                    </Button>
                    <Button onClick={handleClone} variant="primary">
                        Clone
                    </Button>
                </div>
            </div>
        </Stack>
    );
}

export default Dialog;