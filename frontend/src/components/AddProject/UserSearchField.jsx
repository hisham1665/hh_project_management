import React, { useState } from "react";
import { Autocomplete, TextField, Chip, CircularProgress } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function UserSearchField({ selectedUsers, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Assuming you have a context or hook to get the current user
  const handleSearch = async (query) => {
    if (!query) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/search?q=${query}`,{
          headers: { Authorization: `Bearer ${user.token}` },
        });
      setOptions(res.data || []);
    } catch (error) {
      console.error("Atlas search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={selectedUsers}
      getOptionLabel={(option) => option?.name || ""}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      filterSelectedOptions
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        handleSearch(newInputValue);
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Members"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option._id}
            label={option.name}
            {...getTagProps({ index })}
            className="!bg-blue-100 !text-blue-800"
          />
        ))
      }
    />
  );
}
