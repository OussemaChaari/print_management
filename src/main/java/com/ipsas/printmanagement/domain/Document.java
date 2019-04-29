package com.ipsas.printmanagement.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


/**
 * A Document.
 */
@Entity
@Table(name = "document")
public class Document implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "title", nullable = false)
	private String title;

	@Lob
	@Column(name = "jhi_file", nullable = false)
	private String file;

	@Column(name = "jhi_file_content_type", nullable = false)
	private String fileContentType;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public Document title(String title) {
		this.title = title;
		return this;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFile() {
		return file;
	}

	public Document file(String file) {
		this.file = file;
		return this;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public Document fileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
		return this;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Document document = (Document) o;
		if (document.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), document.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "Document{" + "id=" + getId() + ", title='" + getTitle() + "'" + ", file='" + getFile() + "'"
				+ ", fileContentType='" + getFileContentType() + "'" + "}";
	}
}
