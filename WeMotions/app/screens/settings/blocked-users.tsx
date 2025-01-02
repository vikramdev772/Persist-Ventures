import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type BlockedUser = {
  id: string;
  username: string;
  status: string;
  avatar: string;
};

const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <View style={styles.emptyStateIcon}>
      <Ionicons name="person-remove" size={64} color="#27272A" />
    </View>
    <Text style={styles.emptyStateTitle}>You haven't blocked anyone</Text>
    <Text style={styles.emptyStateText}>
      You haven't blocked any accounts. Blocked users will be listed here for easy management.
    </Text>
  </View>
);

const UnblockConfirmationModal: React.FC<{
  visible: boolean;
  username: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ visible, username, onConfirm, onCancel }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Are you sure you that you want to unblock {username}
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={onCancel}
          >
            <Text style={styles.modalCancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalConfirmButton}
            onPress={onConfirm}
          >
            <Text style={styles.modalConfirmButtonText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const BlockedUserItem: React.FC<{
  user: BlockedUser;
  onUnblock: () => void;
}> = ({ user, onUnblock }) => (
  <View style={styles.userItem}>
    <View style={styles.userInfo}>
      <Image
        source={{ uri: user.avatar }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.userStatus}>{user.status}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.unblockButton}
      onPress={onUnblock}
    >
      <Text style={styles.unblockButtonText}>Unblock</Text>
    </TouchableOpacity>
  </View>
);

const BlockedUsers: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<BlockedUser | null>(null);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      username: 'Marc_Heathcotel2',
      status: 'Active Replier',
      avatar: '/placeholder.svg?height=48&width=48',
    },
  ]);

  const handleUnblock = (user: BlockedUser) => {
    setSelectedUser(user);
  };

  const confirmUnblock = () => {
    if (selectedUser) {
      setBlockedUsers(blockedUsers.filter(user => user.id !== selectedUser.id));
      setSelectedUser(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blocked Users</Text>
      </View>

      <View style={styles.content}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter name here please"
            placeholderTextColor="#71717A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {blockedUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={blockedUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BlockedUserItem
                user={item}
                onUnblock={() => handleUnblock(item)}
              />
            )}
            contentContainerStyle={styles.usersList}
          />
        )}

        <UnblockConfirmationModal
          visible={!!selectedUser}
          username={selectedUser?.username || ''}
          onConfirm={confirmUnblock}
          onCancel={() => setSelectedUser(null)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    marginTop: 8,
    position: 'relative',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#27272A',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 24,
  },
  usersList: {
    paddingTop: 8,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#FCD34D',
  },
  username: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#22C55E',
  },
  unblockButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  unblockButtonText: {
    fontSize: 16,
    color: '#A855F7',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#18181B',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  modalText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#27272A',
  },
  modalConfirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#A855F7',
  },
  modalCancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalConfirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default BlockedUsers;

