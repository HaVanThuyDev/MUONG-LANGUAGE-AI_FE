import { StyleSheet, Platform } from 'react-native';

const CLAUDE_BG = '#FBFBF9';
const CLAUDE_SIDEBAR = '#F3F2EE';
const CLAUDE_BORDER = '#E5E3DD';
const CLAUDE_TEXT = '#2E2C29';
const CLAUDE_MUTED = '#78756E';
const CLAUDE_TERRACOTTA = '#C2673B';
const CLAUDE_USER_BUBBLE = '#ECEAE4';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLAUDE_BG,
    flexDirection: 'row',
  },

  // SIDEBAR (CLAUDE EXACT STYLE)
  sidebar: {
    width: 250,
    backgroundColor: CLAUDE_SIDEBAR,
    borderRightWidth: 1,
    borderRightColor: CLAUDE_BORDER,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  sidebarMobile: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    ...Platform.select({
      web: { boxShadow: '4px 0 24px rgba(0,0,0,0.08)' },
      default: { elevation: 8 },
    }),
  },
  sidebarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 90,
  },
  sidebarHeader: {
    padding: 12,
  },
  // "+ Tạo mới" Claude Button
  newChatClaudeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE9E2',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  newChatClaudeText: {
    fontSize: 14,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // Sidebar Menu Items (Tìm kiếm, Dự án, Artifacts...)
  sidebarMenuList: {
    gap: 2,
    marginBottom: 12,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 10,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  sidebarMenuText: {
    fontSize: 13,
    color: '#44403C',
    fontWeight: '500',
  },

  // Search Bar inside sidebar
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 6,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: CLAUDE_TEXT,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
  },
  noSearchResultText: {
    fontSize: 12,
    color: CLAUDE_MUTED,
    fontStyle: 'italic',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  // Section Header: "Đoạn chat và tác vụ ˇ"
  historySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    marginTop: 4,
  },
  historySectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // History List
  historySection: {
    flex: 1,
    paddingHorizontal: 6,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  historyItemActive: {
    backgroundColor: '#E5E3DD',
  },
  historyItemBullet: {
    fontSize: 14,
    color: '#A8A29E',
    marginRight: 8,
    lineHeight: 16,
  },
  historyItemText: {
    flex: 1,
    fontSize: 13,
    color: CLAUDE_TEXT,
  },
  historyItemActiveText: {
    fontWeight: '600',
  },
  deleteHistoryBtn: {
    padding: 3,
    opacity: 0.6,
  },

  // Sidebar Footer: Profile
  sidebarFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: CLAUDE_BORDER,
    backgroundColor: CLAUDE_SIDEBAR,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  userAvatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669', // Claude green avatar
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  userProfileNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: CLAUDE_TEXT,
    maxWidth: 90,
  },
  userTier: {
    fontSize: 12,
    color: CLAUDE_MUTED,
  },
  logoutBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    backgroundColor: '#FFFFFF',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  logoutText: {
    fontSize: 11,
    color: CLAUDE_MUTED,
  },

  // MAIN CONTAINER
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: CLAUDE_BG,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CLAUDE_BORDER,
    backgroundColor: CLAUDE_BG,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuToggleBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    backgroundColor: '#FFFFFF',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },
  headerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#ECEAE4',
  },
  headerBadgeText: {
    fontSize: 12,
    color: CLAUDE_MUTED,
    fontWeight: '500',
  },

  // Chat Scroll Area
  chatScrollView: {
    flex: 1,
    backgroundColor: CLAUDE_BG,
  },
  chatContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },

  // Welcome Screen
  welcomeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  welcomeLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: CLAUDE_TEXT,
    marginBottom: 6,
  },
  welcomeDesc: {
    fontSize: 14,
    color: CLAUDE_MUTED,
  },

  // Chat message rows
  messageRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
    alignItems: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAi: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 2,
  },
  bubbleUser: {
    maxWidth: '80%',
    backgroundColor: CLAUDE_USER_BUBBLE,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bubbleAi: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 24,
    color: CLAUDE_TEXT,
  },
  bubbleTextUser: {
    fontSize: 15,
    lineHeight: 22,
    color: CLAUDE_TEXT,
  },
  bubbleImage: {
    width: 220,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },

  // Thinking State
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  thinkingText: {
    fontSize: 14,
    color: CLAUDE_MUTED,
    fontStyle: 'italic',
  },

  // ==========================================
  // CLAUDE EXACT CHAT INPUT CARD (IMAGE 2)
  // ==========================================
  inputOuterContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 8,
    backgroundColor: CLAUDE_BG,
    alignItems: 'center',
  },
  inputCardContainer: {
    width: '100%',
    maxWidth: 760,
  },
  imagePreviewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
    gap: 8,
  },
  imagePreviewText: {
    fontSize: 12,
    color: CLAUDE_TEXT,
    maxWidth: 240,
  },

  // THE CLAUDE CARD
  claudeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      },
    }),
  },
  textInput: {
    fontSize: 15,
    color: CLAUDE_TEXT,
    lineHeight: 22,
    minHeight: 44,
    maxHeight: 140,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 10,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        borderStyle: 'none',
        resize: 'none',
      },
    }),
  },

  // BOTTOM CONTROLS BAR (IMAGE 2)
  cardBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    position: 'relative',
    zIndex: 50,
  },
  cardBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Attachment "+" button
  plusAttachBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },

  // Segmented Pill: [Đoạn chat] [Đặc sắc văn hóa]
  modeSegmentedWrap: {
    flexDirection: 'row',
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
    padding: 3,
    gap: 2,
  },
  modeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  modeBtnActive: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    }),
  },
  modeBtnText: {
    fontSize: 13,
    color: CLAUDE_MUTED,
    fontWeight: '500',
  },
  modeBtnTextActive: {
    color: CLAUDE_TEXT,
    fontWeight: '600',
  },

  // RIGHT CONTROLS: TOPIC DROPDOWN & SEND
  cardBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicSelectorTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 5,
    backgroundColor: '#F7F6F3',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  topicSelectorText: {
    fontSize: 13,
    color: CLAUDE_TEXT,
    fontWeight: '500',
  },

  // DROPDOWN MENU
  topicDropdownMenu: {
    position: 'absolute',
    right: 40,
    bottom: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 12,
    paddingVertical: 6,
    width: 200,
    zIndex: 999,
    ...Platform.select({
      web: { boxShadow: '0 6px 20px rgba(0,0,0,0.12)' },
    }),
  },
  topicMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  topicMenuItemActive: {
    backgroundColor: '#F3F2EE',
  },
  topicMenuItemText: {
    fontSize: 13,
    color: CLAUDE_TEXT,
  },
  topicMenuItemTextActive: {
    fontWeight: '600',
    color: CLAUDE_TERRACOTTA,
  },

  // Send Button
  claudeSendBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: CLAUDE_TERRACOTTA,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  claudeSendBtnDisabled: {
    backgroundColor: '#D6D3CD',
    ...Platform.select({ web: { cursor: 'not-allowed' } }),
  },
});
