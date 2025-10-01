#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 34
#define LARGE_STATE_COUNT 26
#define SYMBOL_COUNT 19
#define ALIAS_COUNT 0
#define TOKEN_COUNT 12
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 2
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 5

enum {
  sym_string = 1,
  sym_number = 2,
  sym_comment = 3,
  sym_keyword = 4,
  sym_identifier = 5,
  anon_sym_LPAREN = 6,
  anon_sym_RPAREN = 7,
  anon_sym_LBRACK = 8,
  anon_sym_RBRACK = 9,
  anon_sym_LBRACE = 10,
  anon_sym_RBRACE = 11,
  sym_source_file = 12,
  sym__expression = 13,
  sym_list = 14,
  sym_bracket_list = 15,
  sym_brace_list = 16,
  aux_sym_source_file_repeat1 = 17,
  aux_sym_list_repeat1 = 18,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_string] = "string",
  [sym_number] = "number",
  [sym_comment] = "comment",
  [sym_keyword] = "keyword",
  [sym_identifier] = "identifier",
  [anon_sym_LPAREN] = "(",
  [anon_sym_RPAREN] = ")",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
  [anon_sym_LBRACE] = "{",
  [anon_sym_RBRACE] = "}",
  [sym_source_file] = "source_file",
  [sym__expression] = "_expression",
  [sym_list] = "list",
  [sym_bracket_list] = "bracket_list",
  [sym_brace_list] = "brace_list",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_list_repeat1] = "list_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_string] = sym_string,
  [sym_number] = sym_number,
  [sym_comment] = sym_comment,
  [sym_keyword] = sym_keyword,
  [sym_identifier] = sym_identifier,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
  [anon_sym_LBRACE] = anon_sym_LBRACE,
  [anon_sym_RBRACE] = anon_sym_RBRACE,
  [sym_source_file] = sym_source_file,
  [sym__expression] = sym__expression,
  [sym_list] = sym_list,
  [sym_bracket_list] = sym_bracket_list,
  [sym_brace_list] = sym_brace_list,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_list_repeat1] = aux_sym_list_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_string] = {
    .visible = true,
    .named = true,
  },
  [sym_number] = {
    .visible = true,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [sym_keyword] = {
    .visible = true,
    .named = true,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym__expression] = {
    .visible = false,
    .named = true,
  },
  [sym_list] = {
    .visible = true,
    .named = true,
  },
  [sym_bracket_list] = {
    .visible = true,
    .named = true,
  },
  [sym_brace_list] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_list_repeat1] = {
    .visible = false,
    .named = false,
  },
};

enum {
  field_argument = 1,
  field_head = 2,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_argument] = "argument",
  [field_head] = "head",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 2},
  [4] = {.index = 4, .length = 2},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_head, 1},
  [1] =
    {field_argument, 0},
  [2] =
    {field_argument, 2, .inherited = true},
    {field_head, 1},
  [4] =
    {field_argument, 0, .inherited = true},
    {field_argument, 1, .inherited = true},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 2,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 4,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 11,
  [14] = 12,
  [15] = 10,
  [16] = 8,
  [17] = 5,
  [18] = 18,
  [19] = 18,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 21,
  [27] = 20,
  [28] = 25,
  [29] = 24,
  [30] = 30,
  [31] = 23,
  [32] = 22,
  [33] = 33,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(3);
      if (lookahead == '\'') ADVANCE(13);
      if (lookahead == '(') ADVANCE(25);
      if (lookahead == ')') ADVANCE(26);
      if (lookahead == '-') ADVANCE(22);
      if (lookahead == '.') ADVANCE(11);
      if (lookahead == ':') ADVANCE(10);
      if (lookahead == ';') ADVANCE(8);
      if (lookahead == '=') ADVANCE(14);
      if (lookahead == '[') ADVANCE(27);
      if (lookahead == ']') ADVANCE(28);
      if (lookahead == 'e') ADVANCE(17);
      if (lookahead == '{') ADVANCE(29);
      if (lookahead == '}') ADVANCE(30);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(12);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(6);
      if (lookahead != 0 &&
          lookahead != '\\' &&
          lookahead != 's') ADVANCE(24);
      END_STATE();
    case 1:
      if (lookahead == '\'') ADVANCE(4);
      if (lookahead != 0) ADVANCE(1);
      END_STATE();
    case 2:
      if (eof) ADVANCE(3);
      if (lookahead == ';') ADVANCE(9);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(2)
      END_STATE();
    case 3:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(sym_string);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(sym_string);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(sym_number);
      if (lookahead == '.') ADVANCE(23);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(6);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(sym_number);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(7);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead == '\n') ADVANCE(24);
      if (lookahead == '(' ||
          lookahead == ')' ||
          ('[' <= lookahead && lookahead <= ']') ||
          lookahead == 's' ||
          lookahead == '{' ||
          lookahead == '}') ADVANCE(9);
      if (lookahead != 0) ADVANCE(8);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(9);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(sym_keyword);
      if (lookahead == 'm') ADVANCE(16);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(sym_keyword);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == '\'') ADVANCE(13);
      if (lookahead == '-') ADVANCE(22);
      if (lookahead == '.') ADVANCE(11);
      if (lookahead == ':') ADVANCE(10);
      if (lookahead == ';') ADVANCE(8);
      if (lookahead == '=') ADVANCE(14);
      if (lookahead == 'e') ADVANCE(17);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(12);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(6);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == '\'') ADVANCE(5);
      if (lookahead == '(' ||
          lookahead == ')' ||
          ('[' <= lookahead && lookahead <= ']') ||
          lookahead == 's' ||
          lookahead == '{' ||
          lookahead == '}') ADVANCE(1);
      if (lookahead != 0) ADVANCE(13);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == '>') ADVANCE(11);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'a') ADVANCE(11);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'a') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'c') ADVANCE(19);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'c') ADVANCE(21);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'm') ADVANCE(15);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'o') ADVANCE(11);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead == 'r') ADVANCE(20);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(6);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(7);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_identifier);
      if (lookahead != 0 &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 's' &&
          lookahead != '{' &&
          lookahead != '}') ADVANCE(24);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 0},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 0},
  [31] = {.lex_state = 0},
  [32] = {.lex_state = 0},
  [33] = {.lex_state = 2},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_string] = ACTIONS(1),
    [sym_number] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(1),
    [sym_identifier] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
    [anon_sym_LBRACE] = ACTIONS(1),
    [anon_sym_RBRACE] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(33),
    [sym__expression] = STATE(7),
    [sym_list] = STATE(7),
    [sym_bracket_list] = STATE(7),
    [sym_brace_list] = STATE(7),
    [aux_sym_source_file_repeat1] = STATE(7),
    [ts_builtin_sym_end] = ACTIONS(5),
    [sym_string] = ACTIONS(7),
    [sym_number] = ACTIONS(7),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(7),
    [sym_identifier] = ACTIONS(7),
    [anon_sym_LPAREN] = ACTIONS(9),
    [anon_sym_LBRACK] = ACTIONS(11),
    [anon_sym_LBRACE] = ACTIONS(13),
  },
  [2] = {
    [sym__expression] = STATE(2),
    [sym_list] = STATE(2),
    [sym_bracket_list] = STATE(2),
    [sym_brace_list] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_string] = ACTIONS(15),
    [sym_number] = ACTIONS(15),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(15),
    [sym_identifier] = ACTIONS(15),
    [anon_sym_LPAREN] = ACTIONS(18),
    [anon_sym_LBRACK] = ACTIONS(21),
    [anon_sym_RBRACK] = ACTIONS(24),
    [anon_sym_LBRACE] = ACTIONS(26),
    [anon_sym_RBRACE] = ACTIONS(24),
  },
  [3] = {
    [sym__expression] = STATE(3),
    [sym_list] = STATE(3),
    [sym_bracket_list] = STATE(3),
    [sym_brace_list] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(29),
    [sym_string] = ACTIONS(31),
    [sym_number] = ACTIONS(31),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(31),
    [sym_identifier] = ACTIONS(31),
    [anon_sym_LPAREN] = ACTIONS(34),
    [anon_sym_LBRACK] = ACTIONS(37),
    [anon_sym_LBRACE] = ACTIONS(40),
  },
  [4] = {
    [sym__expression] = STATE(2),
    [sym_list] = STATE(2),
    [sym_bracket_list] = STATE(2),
    [sym_brace_list] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_string] = ACTIONS(43),
    [sym_number] = ACTIONS(43),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(43),
    [sym_identifier] = ACTIONS(43),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_RBRACK] = ACTIONS(49),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [5] = {
    [sym__expression] = STATE(11),
    [sym_list] = STATE(11),
    [sym_bracket_list] = STATE(11),
    [sym_brace_list] = STATE(11),
    [aux_sym_source_file_repeat1] = STATE(11),
    [sym_string] = ACTIONS(53),
    [sym_number] = ACTIONS(53),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(53),
    [sym_identifier] = ACTIONS(53),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
    [anon_sym_RBRACE] = ACTIONS(55),
  },
  [6] = {
    [sym__expression] = STATE(30),
    [sym_list] = STATE(30),
    [sym_bracket_list] = STATE(30),
    [sym_brace_list] = STATE(30),
    [aux_sym_list_repeat1] = STATE(6),
    [sym_string] = ACTIONS(57),
    [sym_number] = ACTIONS(57),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(57),
    [sym_identifier] = ACTIONS(57),
    [anon_sym_LPAREN] = ACTIONS(60),
    [anon_sym_RPAREN] = ACTIONS(63),
    [anon_sym_LBRACK] = ACTIONS(65),
    [anon_sym_LBRACE] = ACTIONS(68),
  },
  [7] = {
    [sym__expression] = STATE(3),
    [sym_list] = STATE(3),
    [sym_bracket_list] = STATE(3),
    [sym_brace_list] = STATE(3),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(71),
    [sym_string] = ACTIONS(73),
    [sym_number] = ACTIONS(73),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(73),
    [sym_identifier] = ACTIONS(73),
    [anon_sym_LPAREN] = ACTIONS(9),
    [anon_sym_LBRACK] = ACTIONS(11),
    [anon_sym_LBRACE] = ACTIONS(13),
  },
  [8] = {
    [sym__expression] = STATE(30),
    [sym_list] = STATE(30),
    [sym_bracket_list] = STATE(30),
    [sym_brace_list] = STATE(30),
    [aux_sym_list_repeat1] = STATE(15),
    [sym_string] = ACTIONS(75),
    [sym_number] = ACTIONS(75),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(75),
    [sym_identifier] = ACTIONS(75),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_RPAREN] = ACTIONS(77),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [9] = {
    [sym__expression] = STATE(2),
    [sym_list] = STATE(2),
    [sym_bracket_list] = STATE(2),
    [sym_brace_list] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_string] = ACTIONS(43),
    [sym_number] = ACTIONS(43),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(43),
    [sym_identifier] = ACTIONS(43),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_RBRACK] = ACTIONS(79),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [10] = {
    [sym__expression] = STATE(30),
    [sym_list] = STATE(30),
    [sym_bracket_list] = STATE(30),
    [sym_brace_list] = STATE(30),
    [aux_sym_list_repeat1] = STATE(6),
    [sym_string] = ACTIONS(75),
    [sym_number] = ACTIONS(75),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(75),
    [sym_identifier] = ACTIONS(75),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_RPAREN] = ACTIONS(81),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [11] = {
    [sym__expression] = STATE(2),
    [sym_list] = STATE(2),
    [sym_bracket_list] = STATE(2),
    [sym_brace_list] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_string] = ACTIONS(43),
    [sym_number] = ACTIONS(43),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(43),
    [sym_identifier] = ACTIONS(43),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
    [anon_sym_RBRACE] = ACTIONS(83),
  },
  [12] = {
    [sym__expression] = STATE(4),
    [sym_list] = STATE(4),
    [sym_bracket_list] = STATE(4),
    [sym_brace_list] = STATE(4),
    [aux_sym_source_file_repeat1] = STATE(4),
    [sym_string] = ACTIONS(85),
    [sym_number] = ACTIONS(85),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(85),
    [sym_identifier] = ACTIONS(85),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_RBRACK] = ACTIONS(87),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [13] = {
    [sym__expression] = STATE(2),
    [sym_list] = STATE(2),
    [sym_bracket_list] = STATE(2),
    [sym_brace_list] = STATE(2),
    [aux_sym_source_file_repeat1] = STATE(2),
    [sym_string] = ACTIONS(43),
    [sym_number] = ACTIONS(43),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(43),
    [sym_identifier] = ACTIONS(43),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
    [anon_sym_RBRACE] = ACTIONS(89),
  },
  [14] = {
    [sym__expression] = STATE(9),
    [sym_list] = STATE(9),
    [sym_bracket_list] = STATE(9),
    [sym_brace_list] = STATE(9),
    [aux_sym_source_file_repeat1] = STATE(9),
    [sym_string] = ACTIONS(91),
    [sym_number] = ACTIONS(91),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(91),
    [sym_identifier] = ACTIONS(91),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_RBRACK] = ACTIONS(93),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [15] = {
    [sym__expression] = STATE(30),
    [sym_list] = STATE(30),
    [sym_bracket_list] = STATE(30),
    [sym_brace_list] = STATE(30),
    [aux_sym_list_repeat1] = STATE(6),
    [sym_string] = ACTIONS(75),
    [sym_number] = ACTIONS(75),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(75),
    [sym_identifier] = ACTIONS(75),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_RPAREN] = ACTIONS(95),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [16] = {
    [sym__expression] = STATE(30),
    [sym_list] = STATE(30),
    [sym_bracket_list] = STATE(30),
    [sym_brace_list] = STATE(30),
    [aux_sym_list_repeat1] = STATE(10),
    [sym_string] = ACTIONS(75),
    [sym_number] = ACTIONS(75),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(75),
    [sym_identifier] = ACTIONS(75),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_RPAREN] = ACTIONS(97),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [17] = {
    [sym__expression] = STATE(13),
    [sym_list] = STATE(13),
    [sym_bracket_list] = STATE(13),
    [sym_brace_list] = STATE(13),
    [aux_sym_source_file_repeat1] = STATE(13),
    [sym_string] = ACTIONS(99),
    [sym_number] = ACTIONS(99),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(99),
    [sym_identifier] = ACTIONS(99),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
    [anon_sym_RBRACE] = ACTIONS(101),
  },
  [18] = {
    [sym__expression] = STATE(16),
    [sym_list] = STATE(16),
    [sym_bracket_list] = STATE(16),
    [sym_brace_list] = STATE(16),
    [sym_string] = ACTIONS(103),
    [sym_number] = ACTIONS(103),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(103),
    [sym_identifier] = ACTIONS(103),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [19] = {
    [sym__expression] = STATE(8),
    [sym_list] = STATE(8),
    [sym_bracket_list] = STATE(8),
    [sym_brace_list] = STATE(8),
    [sym_string] = ACTIONS(105),
    [sym_number] = ACTIONS(105),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(105),
    [sym_identifier] = ACTIONS(105),
    [anon_sym_LPAREN] = ACTIONS(45),
    [anon_sym_LBRACK] = ACTIONS(47),
    [anon_sym_LBRACE] = ACTIONS(51),
  },
  [20] = {
    [sym_string] = ACTIONS(107),
    [sym_number] = ACTIONS(107),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(107),
    [sym_identifier] = ACTIONS(107),
    [anon_sym_LPAREN] = ACTIONS(107),
    [anon_sym_RPAREN] = ACTIONS(107),
    [anon_sym_LBRACK] = ACTIONS(107),
    [anon_sym_RBRACK] = ACTIONS(107),
    [anon_sym_LBRACE] = ACTIONS(107),
    [anon_sym_RBRACE] = ACTIONS(107),
  },
  [21] = {
    [sym_string] = ACTIONS(109),
    [sym_number] = ACTIONS(109),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(109),
    [sym_identifier] = ACTIONS(109),
    [anon_sym_LPAREN] = ACTIONS(109),
    [anon_sym_RPAREN] = ACTIONS(109),
    [anon_sym_LBRACK] = ACTIONS(109),
    [anon_sym_RBRACK] = ACTIONS(109),
    [anon_sym_LBRACE] = ACTIONS(109),
    [anon_sym_RBRACE] = ACTIONS(109),
  },
  [22] = {
    [sym_string] = ACTIONS(111),
    [sym_number] = ACTIONS(111),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(111),
    [sym_identifier] = ACTIONS(111),
    [anon_sym_LPAREN] = ACTIONS(111),
    [anon_sym_RPAREN] = ACTIONS(111),
    [anon_sym_LBRACK] = ACTIONS(111),
    [anon_sym_RBRACK] = ACTIONS(111),
    [anon_sym_LBRACE] = ACTIONS(111),
    [anon_sym_RBRACE] = ACTIONS(111),
  },
  [23] = {
    [sym_string] = ACTIONS(113),
    [sym_number] = ACTIONS(113),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(113),
    [sym_identifier] = ACTIONS(113),
    [anon_sym_LPAREN] = ACTIONS(113),
    [anon_sym_RPAREN] = ACTIONS(113),
    [anon_sym_LBRACK] = ACTIONS(113),
    [anon_sym_RBRACK] = ACTIONS(113),
    [anon_sym_LBRACE] = ACTIONS(113),
    [anon_sym_RBRACE] = ACTIONS(113),
  },
  [24] = {
    [sym_string] = ACTIONS(115),
    [sym_number] = ACTIONS(115),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(115),
    [sym_identifier] = ACTIONS(115),
    [anon_sym_LPAREN] = ACTIONS(115),
    [anon_sym_RPAREN] = ACTIONS(115),
    [anon_sym_LBRACK] = ACTIONS(115),
    [anon_sym_RBRACK] = ACTIONS(115),
    [anon_sym_LBRACE] = ACTIONS(115),
    [anon_sym_RBRACE] = ACTIONS(115),
  },
  [25] = {
    [sym_string] = ACTIONS(117),
    [sym_number] = ACTIONS(117),
    [sym_comment] = ACTIONS(3),
    [sym_keyword] = ACTIONS(117),
    [sym_identifier] = ACTIONS(117),
    [anon_sym_LPAREN] = ACTIONS(117),
    [anon_sym_RPAREN] = ACTIONS(117),
    [anon_sym_LBRACK] = ACTIONS(117),
    [anon_sym_RBRACK] = ACTIONS(117),
    [anon_sym_LBRACE] = ACTIONS(117),
    [anon_sym_RBRACE] = ACTIONS(117),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(119), 1,
      ts_builtin_sym_end,
    ACTIONS(109), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [16] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(121), 1,
      ts_builtin_sym_end,
    ACTIONS(107), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [32] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(123), 1,
      ts_builtin_sym_end,
    ACTIONS(117), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [48] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(125), 1,
      ts_builtin_sym_end,
    ACTIONS(115), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [64] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(127), 8,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [78] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(129), 1,
      ts_builtin_sym_end,
    ACTIONS(113), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [94] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(131), 1,
      ts_builtin_sym_end,
    ACTIONS(111), 7,
      sym_string,
      sym_number,
      sym_keyword,
      sym_identifier,
      anon_sym_LPAREN,
      anon_sym_LBRACK,
      anon_sym_LBRACE,
  [110] = 2,
    ACTIONS(133), 1,
      ts_builtin_sym_end,
    ACTIONS(135), 1,
      sym_comment,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(26)] = 0,
  [SMALL_STATE(27)] = 16,
  [SMALL_STATE(28)] = 32,
  [SMALL_STATE(29)] = 48,
  [SMALL_STATE(30)] = 64,
  [SMALL_STATE(31)] = 78,
  [SMALL_STATE(32)] = 94,
  [SMALL_STATE(33)] = 110,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(7),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(19),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(14),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(5),
  [15] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(2),
  [18] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(18),
  [21] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(12),
  [24] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [26] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(17),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [31] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(3),
  [34] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(19),
  [37] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(14),
  [40] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(5),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(2),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(18),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(12),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(24),
  [51] = {.entry = {.count = 1, .reusable = false}}, SHIFT(17),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(11),
  [55] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [57] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 2, .production_id = 4), SHIFT_REPEAT(30),
  [60] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 2, .production_id = 4), SHIFT_REPEAT(18),
  [63] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 2, .production_id = 4),
  [65] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 2, .production_id = 4), SHIFT_REPEAT(12),
  [68] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 2, .production_id = 4), SHIFT_REPEAT(17),
  [71] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [73] = {.entry = {.count = 1, .reusable = false}}, SHIFT(3),
  [75] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [77] = {.entry = {.count = 1, .reusable = false}}, SHIFT(31),
  [79] = {.entry = {.count = 1, .reusable = false}}, SHIFT(29),
  [81] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [83] = {.entry = {.count = 1, .reusable = false}}, SHIFT(28),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(4),
  [87] = {.entry = {.count = 1, .reusable = false}}, SHIFT(21),
  [89] = {.entry = {.count = 1, .reusable = false}}, SHIFT(25),
  [91] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [93] = {.entry = {.count = 1, .reusable = false}}, SHIFT(26),
  [95] = {.entry = {.count = 1, .reusable = false}}, SHIFT(27),
  [97] = {.entry = {.count = 1, .reusable = false}}, SHIFT(23),
  [99] = {.entry = {.count = 1, .reusable = false}}, SHIFT(13),
  [101] = {.entry = {.count = 1, .reusable = false}}, SHIFT(22),
  [103] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [105] = {.entry = {.count = 1, .reusable = false}}, SHIFT(8),
  [107] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_list, 4, .production_id = 3),
  [109] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bracket_list, 2),
  [111] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_brace_list, 2),
  [113] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_list, 3, .production_id = 1),
  [115] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_bracket_list, 3),
  [117] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_brace_list, 3),
  [119] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bracket_list, 2),
  [121] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_list, 4, .production_id = 3),
  [123] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_brace_list, 3),
  [125] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_bracket_list, 3),
  [127] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_list_repeat1, 1, .production_id = 2),
  [129] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_list, 3, .production_id = 1),
  [131] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_brace_list, 2),
  [133] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [135] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_wisp(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
